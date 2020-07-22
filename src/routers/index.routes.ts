import { Router } from 'express'

import * as controller from '../controllers/index.controller'
import * as auth from '../middlewares/auth.middleware';

var router = Router();

router.use(auth.isLogined);

router.route('/')
  .get(controller.index);

router.route('/addTask')
  .post(controller.addTask);

router.route('/task/:id')
  .get(controller.getTaskDetail)
  .put(controller.updateTask)
  .delete(controller.deleteTask);

export default router;