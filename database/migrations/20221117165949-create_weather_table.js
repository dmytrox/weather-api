'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('weather', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      city_id: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { 
          model: 'cities',
          key: 'id',
        },      
      },
      datetime: {
        allowNull: false,
        type: Sequelize.STRING
      },
      apparent_temperature: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      at_unit_id: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { 
          model: 'units',
          key: 'id',
        },      
      },      
      rain: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      rain_unit_id: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { 
          model: 'units',
          key: 'id',
        },      
      },
      snowfall: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      snowfall_unit_id: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { 
          model: 'units',
          key: 'id',
        },      
      },
      visibility: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      visibility_unit_id: {
        allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
        references: { 
          model: 'units',
          key: 'id',
        },      
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
    await queryInterface.dropTable('weather');
  }
};
