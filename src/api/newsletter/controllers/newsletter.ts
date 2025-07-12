/**
 * newsletter controller
 */

import { factories } from "@strapi/strapi";
import { sendWelcomeEmail } from "../../utils/newsletterService.js";

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

      await sendWelcomeEmail(email);

      ctx.response.status = 201;
      return this.transformResponse(newSubscriber);
    },
  })
);
