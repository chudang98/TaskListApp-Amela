import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export async function showLogin(req: Request, res: Response){
  // return res.render('login');
  return res.json({
    message: 'Bạn cần phải login trước !',
  });
}

export async function confirmLogin(req: Request, res: Response){
  var { userName, password } = req.body;
  console.log(userName, password);
  console.log(_isRightAccount(userName, password));
  if(await _isRightAccount(userName, password)){
    var token = await _createToken(userName);
    var cookieOption = {
      expires: new Date(
        Date.now() + Number( process.env.JWT_COOKIE_EXPORES_IN ) * 86400000000
      ),
      secure: false,
      httpOnly: true 
    };
    await res.cookie('jwt', token, cookieOption);
    return res.redirect('/')    
  }
  else
    return res.redirect('/login')
}

async function _createToken(username: string){
  var expiresIn = Number(process.env.JWT_EXPIRES_DAY) * Number(process.env.JWT_EXPIRES_HOUR);
  var secret = process.env.JWT_SECRET;
  return jwt.sign(
    {
      userName: username,
    },
    secret,
    {
      expiresIn
    }
  );
}

async function _isRightAccount(userName: string, password: string)
{
  if(userName === 'admin' && password === '123456')
    return true;
  return false;
}