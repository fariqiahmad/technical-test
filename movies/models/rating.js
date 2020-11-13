'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
    * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rating.init({
    movieId: DataTypes.INTEGER,
    ratingSourceId: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rating',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
  });
  return rating;
};