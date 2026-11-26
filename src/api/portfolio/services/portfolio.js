'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::portfolio.portfolio', () => ({
  find(params) {
    return super.find({ ...params, status: 'published' });
  },
}));
