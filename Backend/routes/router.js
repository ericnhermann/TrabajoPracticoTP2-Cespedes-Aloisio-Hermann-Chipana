import { Router } from 'express';
import userRouter from './userRoutes.js';
import reservasRouter from './reservasRoutes.js';

const router = Router();

router.use("/users", userRouter);
router.use("/reservas", reservasRouter)

export default router;