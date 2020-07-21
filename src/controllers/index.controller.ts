import { Request, Response } from 'express'

module.exports = {
    indexController,
};

async function indexController(req: Request, res: Response){
  return res.json({
    status: 'success',
  })
}