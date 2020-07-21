import { Router, Request, Response } from 'express'
import * as controller from '../controllers/index.controller'

var router = Router();

// router.route('/test')
//   .get((req:Request, res:Response) => {
//     console.log('Hello');
    
//     return res.json({
//       a: 'sadasd'
//     })
//   });
router.get('/a', (req, res)=>{
  return res.json({
    a: "asdas",
  })
})


export default router;