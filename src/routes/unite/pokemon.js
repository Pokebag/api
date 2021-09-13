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

			const ORDERED_POKEMOM = POKEMON.sort((monA, monB) => {
				if (monA.id > monB.id) {
					return 1
				}

				if (monA.id < monB.id) {
					return -1
				}

				return 0
			})

			context.data = {
				pokemon: ORDERED_POKEMOM.reduce((accumulator, mon) => {
					accumulator[mon.id] = mon
					return accumulator
				}, {}),
			}
		} catch (error) {
			context.errors.push(error.message)
		}
	}
}
