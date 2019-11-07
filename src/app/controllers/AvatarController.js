import File from '../models/File';

class AvatarController {
  async store(req, res) {
    const {
      originalname: name,
      key,
      location: url,
      mimetype: type,
      size,
    } = req.file;

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
     * Destroy previous avatar image
     */
    const previousAvatar = await File.findOne({
      where: { avatar: true, owner: req.userId },
    });

    if (previousAvatar) {
      const { path } = previousAvatar;

      await File.destroy({ where: { path } });
    }

    /**
     * Return new avatar
     */
    const path = key;
    const file = await File.create({
      name,
      path,
      url,
      type,
      owner: req.userId,
      avatar: true,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const { path } = req.params;

    await File.destroy({ where: { path } });

    return res.json({ sucess: 'Arquivo foi deletado' });
  }
}

export default new AvatarController();
