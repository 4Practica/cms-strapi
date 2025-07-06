/**
 * author controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController(
  'api::author.author',
  ({ strapi }) => ({

    async find(ctx) {
      const entity = await strapi.db.query('api::author.author').findMany({
        // Line to populate the relationships
        populate: { image: true },
      });

      for(const author of entity){
        author.imageUrl = author.image?.url
        delete author.image
      }

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

      return this.transformResponse(sanitizedEntity);
    },
    
  })
);