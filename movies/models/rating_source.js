'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rating_source extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.rating_source, {
        through: 'rating',
        foreignKey: 'ratingSourceId',
        otherKey: 'movieId',
        as: 'ratings'
      })
    }
  };
  rating_source.init({
    source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rating_source',
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
  });
  return rating_source;
};