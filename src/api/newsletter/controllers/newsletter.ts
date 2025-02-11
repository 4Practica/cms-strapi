/**
 * newsletter controller
 */

import { factories } from "@strapi/strapi";
import sgMail from "@sendgrid/mail";

export default factories.createCoreController(
  "api::newsletter.newsletter",
  ({ strapi }) => ({
    async subscribe(ctx) {
      const { email } = ctx.request.body;

      const entity = await strapi.db
        .query("api::newsletter.newsletter")
        .findOne({
          where: { email },
          select: ["email"],
        });

      if (entity) {
        return ctx.badRequest("Something was wrong, try again", {
          email: email,
        });
      }

      const newSubscriber = await strapi.db
        .query("api::newsletter.newsletter")
        .create({
          data: { email, publishedAt: new Date() },
          select: ["id", "email"],
        });

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: email,
        from: "marketing@devcorner.top",
        templateId: "d-18b4711d975a4813876dfc6ba510bdee",
      };
      sgMail.send(msg);

      ctx.response.status = 201;
      return this.transformResponse(newSubscriber);
    },
  })
);
