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
          data: { email, publishedAt: new Date(), isActive: true },
          select: ["id", "email"],
        });

      await sendWelcomeEmail(email);

      ctx.response.status = 201;
      return this.transformResponse(newSubscriber);
    },

    async unsubscribe(ctx) {
      const { email } = ctx.request.body;

      if (!email) {
        return ctx.badRequest(400, "Missing email in request body");
      }

      const user = await strapi.db.query("api::newsletter.newsletter").findOne({
        where: { email },
      });

      if (user.email.length > 0) {
        console.log(user);
        user.isActive = false;

        await strapi.db.query("api::newsletter.newsletter").update({
          where: { email: user.email },
          data: { isActive: false },
        });

        return ctx.send({ status: "User successfully unsubscribed" });
      }

      return ctx.send({ status: "User not found" });
    },
  })
);
