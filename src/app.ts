import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParse from 'cookie-parser';

import indexRoute from './routers/index.routes';
import authRoute from './routers/auth.routes';

bodyParser.urlencoded({ extended: true });

var App = express();

App.use(cors());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
App.use(cookieParse());

App.use('/login', authRoute);
App.use('/', indexRoute);

// App.get('/', (req:Request, res:Response) => {
//   console.log('1');
  
//   return res.json({
//     a: 'asdsa',
//   })
// });

export default App