// Module imports
import { getHeldItems } from '@pokebag/data-sdk'





// Local imports
import { calculateHeldItemStats } from '../../../helpers/unite/calculateHeldItemStats.js'
import { Route } from '../../../structures/Route.js'





/**
 * Returns data for a single Pokémon.
 */
export class SignleHeldItemRoute extends Route {
	path = '/held-items/:itemID'

	/**
	 * Route handler
	 * @param {*} context
	 */
	async handler (context) {
		try {
			const { itemID } = context.params

			const SHOULD_CALCULATE_STATS = JSON.parse(context.query['calculate-stats'] || 'false')

			const [ITEM] = await getHeldItems({
				ids: [itemID],
				patch: context.params.patchVersion,
			})

			ITEM.id = itemID

			if (SHOULD_CALCULATE_STATS) {
				ITEM.stats = calculateHeldItemStats(ITEM)
			}

			context.data = {
				items: {
					[itemID]: ITEM,
				},
			}
		} catch (error) {
			context.errors.push(error.message)
		}
	}
}
