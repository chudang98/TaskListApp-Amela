import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import DataInToken from '../interfaces/dataInToken';

export async function isLogined(req: Request, res: Response, next: NextFunction){
  if(req.cookies.jwt){
    var decoded = await jwt.verify(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    ) as DataInToken;
    console.log(decoded);
    if(decoded.userName == 'admin')
      return next();
    else
      return res.redirect('/login')
  }
  else{
    return res.redirect('/login');
  }
}

