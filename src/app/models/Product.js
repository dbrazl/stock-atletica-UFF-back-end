import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
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
}

export default Product;
