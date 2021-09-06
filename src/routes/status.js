// Local imports
import { Route } from '../structures/Route.js'





export class StatusRoute extends Route {
	path = '/status'

	handler = async context => {
		context.status = 200
	}
}
