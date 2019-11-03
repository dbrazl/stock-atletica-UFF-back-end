import User from '../models/User';
import File from '../models/File';

class UserController {
  async store(req, res) {
    /**
     * Verify if the user exist in DB
     */
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(401).json({ error: 'User already exists.' });
    }

    /**
     * Create user in DB
     */
    const { id, name, email, personality, cellphone } = await User.create(
      req.body
    );

    /**
     * Return user
     */
    return res.json({
      id,
      name,
      email,
      personality,
      cellphone,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    /**
     * Verify change in user email and if it's available
     */
    if (email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(401).json({ error: 'User already exist.' });
      }
    }

    /**
     * Verify if the old password is correct
     */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Old password is not match.' });
    }

    /**
     * Update user in DB
     */
    const { id, name, avatar_id, cellphone } = await user.update(req.body);

    /**
     * Find url of avatar if it files
     */
    const file = await File.findOne({ where: { id: avatar_id } });

    const url = file && file.url;

    /**
     * Return user
     */
    return res.json({
      id,
      name,
      email,
      cellphone,
      avatar: { avatar_id, url },
    });
  }

  async delete(req, res) {
    const files = await File.findAll({ where: { owner: req.userId } });

    files.map(file => File.destroy({ where: { path: file.path } }));
    await User.destroy({ where: { id: req.userId } });

    res.json({ sucess: 'Account has been deleted' });
  }
}

export default new UserController();
