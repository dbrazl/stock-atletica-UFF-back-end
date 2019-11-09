import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

/**
 * Controllers
 */
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RestoreController from './app/controllers/RestoreController';
import AvatarController from './app/controllers/AvatarController';
import ProductController from './app/controllers/ProductController';
import ThumbnailController from './app/controllers/ThumbnailController';

/**
 * Midlewarer
 */
import AuthMiddleware from './app/middlewares/auth';

/**
 * Validators
 */
import ValidateUserStore from './app/middlewares/validators/UserStore';
import ValidateUserUpdate from './app/middlewares/validators/UserUpdate';
import ValidateSessionStore from './app/middlewares/validators/SessionStore';
import ValidateRestoreUpdate from './app/middlewares/validators/RestoreUpdate';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/user', ValidateUserStore, UserController.store);
routes.post('/session', ValidateSessionStore, SessionController.store);
routes.put('/user/restore', ValidateRestoreUpdate, RestoreController.update);

routes.use(AuthMiddleware);

routes.put('/user', ValidateUserUpdate, UserController.update);
routes.delete('/user', UserController.delete);

// Validar essas rotas!!!
routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products', ProductController.update);
routes.post(
  '/product/thumbnail:product_owner',
  upload.single('file'),
  ThumbnailController.store
);

routes.post('/avatar', upload.single('file'), AvatarController.store);
routes.delete('/avatar/:path', AvatarController.delete);

export default routes;
