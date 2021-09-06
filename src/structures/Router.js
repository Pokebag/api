// Module imports
import KoaRouter from 'koa-router'





/**
 * Wrapper for `koa-router` that simplifies attachment of routes and subrouters.
 *
 * @property {KoaRouter} router
 */
class Router {
	router = new KoaRouter

	/**
	 * Connects a route to the router.
	 *
	 * @param {*} route
	 */
	addRoute (route) {
		const {
			handler,
			path,
		} = route
		let { methods } = route

		if (!Array.isArray(methods)) {
			methods = [methods]
		}

		methods.forEach((method) => {
			return this.router[method](path, handler)
		})
	}

	/**
	 * Connects a subrouter to the router.
	 *
	 * @param {string} path
	 * @param {*} router
	 */
	addSubRouter (path, router) {
		let localRouter = router

		if (router instanceof Router) {
			localRouter = router.router
		}

		this.router.use(path, localRouter.routes(), localRouter.allowedMethods())
	}
}





export { Router }
