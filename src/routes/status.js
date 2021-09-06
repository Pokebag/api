// Local imports
import { Route } from '../structures/Route.js'





/**
 * Health check endpoint.
 */
export class StatusRoute extends Route {
	path = '/status'

	/**
	 * Route handler
	 * @param {*} context
	 */
	handler (context) {
		context.status = 200
	}
}
