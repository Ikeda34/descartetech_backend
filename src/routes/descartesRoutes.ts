
import { Router } from 'express';
import { registrarDescarte } from '../controllers/descartesController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, registrarDescarte);

export default router;
