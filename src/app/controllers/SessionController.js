import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { username, password } = req.body;

    /**
     * Verify if the user exist
     */
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não existe' });
    }

    /**
     * Check password
     */
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha não bate' });
    }

    const { id, name, email, personality, cellphone, avatar_id } = user;

    /**
     * Find url of user avatar if it exist
     */
    const file = await File.findOne({ where: { id: avatar_id } });

    const url = file && file.url;

    /**
     * Return user and token
     */
    return res.json({
      user: {
        id,
        username,
        name,
        email,
        personality,
        cellphone,
        avatar: { avatar_id, url },
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
