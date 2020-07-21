import express, { Request, Response } from 'express';
import { Application } from 'express';

import cors from 'cors';

import bodyParser from 'body-parser';
import indexRoute from './routers/index.routes';

bodyParser.urlencoded({ extended: true });

var App:Application = express();

App.use(cors());
App.use(bodyParser);
App.use(express.json());
// App.use('/', indexRoute.default);

App.get('/', (request, response) => {
  return response.send('Hello world!');
});
 
// App.get('/', (req:Request, res:Response) => {
//   console.log('1');
  
//   return res.json({
//     a: 'asdsa',
//   })
// });

export default App