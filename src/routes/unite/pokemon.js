// Module imports
import { getPokemon } from '@pokebag/data-sdk'





// Local imports
import { Route } from '../../structures/Route.js'





/**
 * Returns all available Pokémon.
 */
export class PokemonRoute extends Route {
	path = '/pokemon'

	/**
	 * Route handler
	 * @param {*} context
	 */
	async handler (context) {
		try {
			const POKEMON = await getPokemon({
				includeSkills: true,
				patch: context.params.patchVersion,
			})

			context.data = {
				pokemon: POKEMON.reduce((accumulator, mon) => {
					accumulator[mon.id] = mon
					return accumulator
				}, {}),
			}
		} catch (error) {
			context.errors.push(error.message)
		}
	}
}
