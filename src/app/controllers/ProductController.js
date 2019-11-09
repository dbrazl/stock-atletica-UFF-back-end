import Product from '../models/Product';
import File from '../models/File';

class ProductController {
  async store(req, res) {
    /**
     * Verify if product exist on DB
     */
    const productExist = Product.findOne({ where: { name: req.body.name } });
    if (!productExist) {
      return res.status(401).json({ error: 'Produto já foi cadastrado' });
    }

    /**
     * Create product on DB
     */
    const {
      name,
      quantity_stock,
      quantity_reserved,
      unit_price,
      size,
      category,
      color,
      status,
    } = await Product.create(req.body);

    /**
     * Return product
     */
    return res.status(200).json({
      name,
      quantity_stock,
      quantity_reserved,
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
      const productExist = await Product.findOne({ where: { name: newName } });

      if (productExist) {
        return res.status(401).json({ error: 'Produto já existe' });
      }
    }

    /**
     * Update user in DB
     */
    const {
      quantity_stock,
      quantity_reserved,
      unit_price,
      size,
      category,
      color,
      status,
      thumbnail_id,
    } = await product.update({ ...req.body, name: newName });

    /**
     * Find url of avatar if it files
     */
    const file = await File.findOne({ where: { id: thumbnail_id } });

    const url = file && file.url;

    /**
     * Return product
     */
    return res.status(200).json({
      newName,
      quantity_stock,
      quantity_reserved,
      unit_price,
      size,
      category,
      color,
      status,
      productImage: {
        thumbnail_id,
        url,
      },
    });
  }

  async index(req, res) {
    const products = await Product.findAll();

    /**
     * Verify if exist product in DB
     */
    if (!products) {
      res.status(404).json({ error: 'Não há produtos cadastrados' });
    }

    return res.status(200).json({ products });
  }
}

export default new ProductController();
