'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('units',
    [
      {
        unit: '°C',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        unit: 'mm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unit: 'cm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        unit: 'm',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('units', null, {});
  }
};
