'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      release_date: {
        type: Sequelize.DATE
      },
      rated: {
        type: Sequelize.STRING
      },
      runtime:{
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      director: {
        type: Sequelize.STRING
      },
      writer: {
        type: Sequelize.TEXT
      },
      actors: {
          type: Sequelize.STRING
      },
      plot: {
        type: Sequelize.STRING
      },
      language: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};