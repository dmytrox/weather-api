'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      lat: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      long: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      views_count: {
        defaultValue: 0,
        type: Sequelize.BIGINT.UNSIGNED
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }, 
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cities');
  }
};
