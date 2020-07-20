import App from './app'

import * as bodyParser from 'body-parser'
// import loggerMiddleware from './middleware/logger'


const app = new App({
    port: 5000,
    routers: [
        // new HomeController(),
        // new PostsController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        // loggerMiddleware
    ],

})

app.listen()