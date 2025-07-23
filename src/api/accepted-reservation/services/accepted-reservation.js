'use strict';

/**
 * accepted-reservation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::accepted-reservation.accepted-reservation');
