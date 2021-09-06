// Local imports
import { Router } from '../structures/Router.js'
import { StatusRoute } from './status.js'
import { uniteRouter } from './unite/router.js'





const mainRouter = new Router

mainRouter.addSubRouter('/unite/:patchVersion?', uniteRouter)
mainRouter.addRoute(new StatusRoute)

export { mainRouter }
