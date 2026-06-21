import { Router } from 'express';
import userRouter from './userRoutes.js';
import reservasRouter from './reservasRoutes.js';
import rolesRouter from './rolesRoutes.js';

const router = Router();

router.use("/users", userRouter);
router.use("/reservas", reservasRouter);
router.use("/roles", rolesRouter);

export default router;