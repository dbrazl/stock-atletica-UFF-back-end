import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity_stock: Sequelize.INTEGER,
        quantity_reserved: Sequelize.INTEGER,
        unit_price: Sequelize.DOUBLE,
        size: Sequelize.STRING,
        category: Sequelize.STRING,
        color: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'thumbnail_id' });
  }
}

export default Product;
