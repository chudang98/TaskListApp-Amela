import { Router } from 'express'
import * as controller from '../controllers/index.controller'

var router = Router();


router.route('/')
  .get(controller.indexController);

export default router;