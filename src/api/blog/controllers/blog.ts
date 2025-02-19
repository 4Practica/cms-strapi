"use strict";
/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    async findOne(ctx) {
      const { slug } = ctx.params;
      const entity = await strapi.db.query("api::blog.blog").findOne({
        where: { slug },

        // Line to populate the relationships
        populate: { tags: true, author: true, meta_datum: true },
      });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },

    // async find(ctx) {
    //   const entity = await strapi.db.query("api::blog.blog").findMany({
    //     // Line to populate the relationships
    //     populate: { tags: true, author: true },
    //     offset: ctx.query.pagination.page * ctx.query.pagination.limit,
    //   });

    //   const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    //   return this.transformResponse(sanitizedEntity, {
    //     pagination: ctx.query.pagination,
    //   });
    // },

    async customSearch(ctx) {
      const { search } = ctx.params;
      const arrayOfSearch = search.split("-");

      const entity = await strapi.db.query("api::blog.blog").findMany({
        where: {
          $or: [
            {
              title: { $containsi: arrayOfSearch },
            },
            {
              shortDescription: { $containsi: arrayOfSearch },
            },
            {
              blogData: { $containsi: arrayOfSearch },
            },
          ],
        },
        populate: { tags: true, author: true },
      });

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
  })
);
