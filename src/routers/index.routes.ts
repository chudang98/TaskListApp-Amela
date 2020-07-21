import { Router, Request, Response } from 'express'
import * as controller from '../controllers/index.controller'

var router = Router();
router.route('/')
  .get(controller.indexController)

router.route('/addTask')
  .post(controller.addTask)

router.route('/detailTask/:index')
  .get(controller.getTaskDetail)
  .post(controller.updateTask)

router.route('/deleteTask/:index')
  .get(controller.deleteTask);

export default router;