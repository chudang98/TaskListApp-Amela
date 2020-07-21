import express from 'express';
import path from 'path';
import cors from 'cors';

import bodyParser from 'body-parser';
import indexRoute from './routers/index.routes';

bodyParser.urlencoded({ extended: true });

var App = express();

App.use(cors());
App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());

App.set('view engine', 'pug')
App.set('views', path.join(__dirname, 'views'));

App.use('/', indexRoute);



// App.get('/', (req:Request, res:Response) => {
//   console.log('1');
  
//   return res.json({
//     a: 'asdsa',
//   })
// });

export default App