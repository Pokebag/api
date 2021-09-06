// Module imports
import { getHeldItems } from '@pokebag/data-sdk'





// Local imports
import { calculateHeldItemStats } from '../../helpers/unite/calculateHeldItemStats.js'
import { Route } from '../../structures/Route.js'





/**
 * Returns all available held items.
 */
export class HeldItemsRoute extends Route {
	path = '/held-items'

	/**
	 * Route handler
	 * @param {*} context
	 */
	async handler (context) {
		try {
			const SHOULD_CALCULATE_STATS = Boolean(context.query.calculateStats)
			const ITEMS = await getHeldItems({ patch: context.params.patchVersion })

			context.data = ITEMS.map((item) => {
				const attributes = { ...item }

				delete attributes.id

				if (SHOULD_CALCULATE_STATS) {
					item.stats = calculateHeldItemStats(item)
				}

				return {
					attributes,
					id: item.id,
					type: 'heldItem',
				}
			})
		} catch (error) {
			context.errors.push(error.message)
		}
	}
}
