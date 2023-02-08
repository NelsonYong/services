import Koa from 'koa'
import * as db from './mongoose'
import { createServer } from 'http'
import Router from '@koa/router'
import KoaBody from 'koa-body'
import { initGlobalRoute } from './routes'
import { handleResponse } from './middleware'

const router = new Router()
const app = new Koa()
const httpServer = createServer(app.callback())
db.connect()

app.use(
	KoaBody({
		multipart: true,
	})
)
initGlobalRoute(router)
app.use(handleResponse())
app.use(router.routes()).use(router.allowedMethods())

httpServer.listen(3200)
