/**
 * blog router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::blog.blog', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
