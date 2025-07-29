import express from 'express';
import { authMiddleware } from '../middlewares/authMiddlewares';

// Routes
import entityRoutes from './entity/entity.routes';

const privateRoutes= express.Router();

// Aplica el middleware a todas las rutas de este grupo
privateRoutes.use(authMiddleware);


// Rutas protegidas
privateRoutes.use('/entity', entityRoutes);

export default privateRoutes;