import File from '../models/File';

class ThumbnailController {
  async store(req, res) {
    const {
      originalname: name,
      key,
      location: url,
      mimetype: type,
      size,
    } = req.file;

    const { product_owner } = req.params;

    /**
     * Verify if the file is a image
     */
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
      'image/svg',
    ];

    if (!allowedMimes.includes(type)) {
      res.status(400).json({ error: 'Arquivo de tipo inválido' });
    }

    /**
     * Verify if the size of image is less than 5 MB
     */
    if (size > 5 * 1024 * 1024) {
      res.status(400).json({ error: 'Arquivo é muito grande' });
    }

    /**
     * Destroy previous thumbnail image
     */
    const previousThumbnail = await File.findOne({
      where: { product_owner },
    });

    if (previousThumbnail) {
      const { path } = previousThumbnail;

      await File.destroy({ where: { path } });
    }

    /**
     * Return new thumbnail
     */
    const path = key;
    const file = await File.create({
      name,
      path,
      url,
      type,
      product_owner,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const { path } = req.params;

    await File.destroy({ where: { path } });

    return res.json({ sucess: 'Arquivo foi deletado' });
  }
}

export default new ThumbnailController();
