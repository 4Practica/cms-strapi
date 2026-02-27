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
        populate: {
          image: true,
          tags: true,
          author: { populate: { image: true } },
          meta_datum: true,
        },
      });

      entity.author.imageUrl = entity.author.image?.url;
      delete entity.author.image;

      entity.imageUrl = entity.image?.url;
      delete entity.image;

      return this.transformResponse(entity);
    },
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
        populate: { tags: true, author: true, image: true },
      });
      for (const blog of entity) {
        blog.imageUrl = blog.image?.url;
        delete blog.image;
      }

      return this.transformResponse(entity);
    },
    async find(ctx) {
      const { pagination } = ctx.query as any;
      const page = pagination?.page ? Number(pagination.page) : 1;
      const pageSize = pagination?.pageSize ? Number(pagination.pageSize) : 9;
      const start = (page - 1) * pageSize;

      const [entities, total] = await Promise.all([
        strapi.db.query("api::blog.blog").findMany({
          populate: {
            image: true,
            tags: true,
            author: { populate: { image: true } },
            meta_datum: true,
          },
          where: { publishedAt: { $notNull: true } },
          offset: start,
          limit: pageSize,
        }),
        strapi.db.query("api::blog.blog").count({
          where: { publishedAt: { $notNull: true } },
        }),
      ]);

      for (const blog of entities) {
        blog.imageUrl = blog.image?.url;
        delete blog.image;
      }

      return this.transformResponse(entities, {
        pagination: {
          page,
          pageSize,
          pageCount: Math.ceil(total / pageSize),
          total,
        },
      });
    },
  }),
);
