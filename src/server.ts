import App from './app';
import dotenv from'dotenv';

dotenv.config({ path: './config.env' });

var port:number = Number(process.env.PORT);
console.log(port);


App.listen(port, () => {
  console.log(`App listening on the http://localhost:${port}`);
})