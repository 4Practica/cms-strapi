/**
 * meta-data router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::meta-data.meta-data', {
  config: {
    find: { auth: false },
    findOne: { auth: false },
  },
});
