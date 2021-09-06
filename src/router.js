// Local imports
import { Router } from './structures/Router.js'
import { uniteRouter } from './routes/unite/router.js'
import { StatusRoute } from './routes/status.js'





const mainRouter = new Router()

mainRouter.addSubRouter('/unite/:patchVersion?', uniteRouter)
mainRouter.addRoute(new StatusRoute)

export { mainRouter }
