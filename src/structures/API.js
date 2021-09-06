// Module imports
import body from 'koa-body'
import cors from '@koa/cors'
import compress from 'koa-compress'
import Koa from 'koa'
import logger from 'koa-logger'
import noTrailingSlash from 'koa-no-trailing-slash'





// Local imports
import { bodyBuilder } from '../helpers/bodyBuilder.js'
import { statusCodeGenerator } from '../helpers/statusCodeGenerator.js'
import { mainRouter } from '../routes/router.js'





// Local constants
const app = new Koa()





// Attach middlewares
app.use(logger())
app.use(noTrailingSlash())
app.use(compress())
app.use(cors())
app.use(body())
app.use(statusCodeGenerator)
app.use(bodyBuilder)

app.use(mainRouter.router.routes())
app.use(mainRouter.router.allowedMethods())





export default app
