import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    /**
     * Verify if product exist on DB
     */
    const productExist = Product.findOne({ where: { name: req.body.name } });
    if (productExist) {
      return res.status(401).json({ error: 'Produto já foi cadastrado' });
    }

    /**
     * Create product on DB
     */
    const {
      name,
      quantity,
      unit_price,
      size,
      category,
      color,
      status,
    } = Product.create(req.body);

    /**
     * Return product
     */
    return res.status(200).json({
      name,
      quantity,
      unit_price,
      size,
      category,
      color,
      status,
    });
  }

  async update(req, res) {
    const { name, newName } = req.body;

    /**
     * Verify if the product exist
     */
    const product = await Product.findOne({ where: { name } });
    if (!product) {
      return res.status(401).json({ error: 'Produto não existe' });
    }

    /**
     * Verify if the new name is available
     */
    if (newName !== product.name) {
      const productExist = await Product.findOne({ where: { newName } });

      if (productExist) {
        return res.status(401).json({ error: 'Produto já existe' });
      }
    }

    /**
     * Update user in DB
     */
    const {
      quantity,
      unit_price,
      size,
      category,
      color,
      status,
    } = await product.update(req.body);

    /**
     * Return product
     */
    return res.status(200).json({
      name,
      quantity,
      unit_price,
      size,
      category,
      color,
      status,
    });
  }
}

export default new ProductController();
