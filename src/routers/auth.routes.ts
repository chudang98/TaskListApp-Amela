import { Router } from 'express'

import * as controller from '../controllers/auth.controller'

var router = Router();

router.route('/')
  .get(controller.showLogin)
  .post(controller.confirmLogin)

export default router;