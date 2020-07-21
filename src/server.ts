import App from './app'
// import loggerMiddleware from './middleware/logger'

var port:number = 3000;

App.listen(port, () => {
  console.log(`App listening on the http://localhost:${port}`);
})