'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.rating_source, {
        through: 'rating',
        foreignKey: 'movieId',
        otherKey: 'ratingSourceId'
      })
    }
  };
  movie.init({
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    released: DataTypes.DATE,
    rated: DataTypes.STRING,
    runtime: DataTypes.STRING,
    genre: DataTypes.STRING,
    director: DataTypes.STRING,
    writer: DataTypes.TEXT,
    actors: DataTypes.STRING,
    plot: DataTypes.STRING,
    language: DataTypes.STRING,
    country: DataTypes.STRING,
    awards: DataTypes.STRING,
    poster: DataTypes.STRING,
    metascore: DataTypes.INTEGER,
    imdbRating: DataTypes.FLOAT,
    imdbVotes: DataTypes.DOUBLE,
    imdbId: DataTypes.STRING,
    type: DataTypes.STRING,
    dvd: DataTypes.STRING,
    boxOffice: DataTypes.STRING,
    production: DataTypes.STRING,
    website: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};