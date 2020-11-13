'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      released: {
        type: Sequelize.DATE
      },
      rated: {
        type: Sequelize.STRING
      },
      runtime: {
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
      awards: {
        type: Sequelize.STRING
      },
      poster: {
        type: Sequelize.STRING
      },
      metascore: {
        type: Sequelize.INTEGER
      },
      imdbRating: {
        type: Sequelize.FLOAT
      },
      imdbVotes: {
        type: Sequelize.DOUBLE
      },
      imdbId: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      dvd: {
        type: Sequelize.STRING
      },
      boxOffice: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('movies');
  }
};