import examplesRouter from './api/controllers/examples/router.js';
import roleRouter from './api/controllers/roles/router.js';
import userRouter from './api/controllers/users/router.js';
import authRouter from './api/controllers/auth/router.js';
// LINK EL ARCHIVO DE RUTAS CON SUS RUTAS
export default function routes(app) {
  app.use('/api/v1_1/examples', examplesRouter);
  console.log("Router")
  app.use('/api/v1_1/role', roleRouter);
  app.use('/api/v1_1/user', userRouter);
  app.use('/api/v1_1/auth', authRouter);
}