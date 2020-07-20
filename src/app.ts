import * as express from 'express'
import { Application } from 'express'

class App {
  public app: Application
  public port: number

  constructor(appInit: { port: number; middleWares: any; routers: any; }) {
    this.app = express()
    this.port = appInit.port

    this.middlewares(appInit.middleWares)
    this.routes(appInit.routers)
    this.assets()
    this.template()
  }

  private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
    middleWares.forEach(middleWare => {
      this.app.use(middleWare)
    })
  }

  private routes(routers: { forEach: (arg0: (controller: any) => void) => void; }) {
    routers.forEach(controller => {
        this.app.use('/', controller.router)
    })
  }

  private assets() {
    this.app.use(express.static('public'))
    this.app.use(express.static('views'))
  }

  private template() {
    this.app.set('view engine', 'pug')
  }

  public listen() {
    this.app.listen(this.port, () => {
        console.log(`App listening on the http://localhost:${this.port}`)
    })
  }
}

export default App