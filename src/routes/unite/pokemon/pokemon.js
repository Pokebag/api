// Local imports
import {
	getPokemon,
	getSkills,
} from '@pokebag/data-sdk'
import { Route } from '../../../structures/Route.js'





/**
 * Returns data for a single Pokémon.
 */
export class SinglePokemonRoute extends Route {
	path = '/pokemon/:pokemonID'

	/**
	 * Route handler
	 * @param {*} context
	 */
	async handler (context) {
		try {
			let includes = context.query.include
			let skills = null

			if (!Array.isArray(includes)) {
				includes = [includes]
			}

			const { pokemonID } = context.params

			const [POKEMON] = await getPokemon({
				ids: [pokemonID],
				patch: context.params.patchVersion,
			})

			const RELATIONSHIPS = {
				skills: {
					links: {
						related: `/unite/skills?filter[pokemon]=${POKEMON.id}`,
					},
				},
			}

			if (includes.includes('skills')) {
				skills = await getSkills({ pokemonIDs: [pokemonID] })
				// @ts-ignore
				RELATIONSHIPS.skills.data = skills.map(skill => {
					return {
						id: skill.id,
						type: 'skill',
					}
				})
			}

			const ATTRIBUTES = { ...POKEMON }

			delete ATTRIBUTES.id

			context.data = {
				attributes: ATTRIBUTES,
				id: pokemonID,
				relationships: RELATIONSHIPS,
				type: 'pokemon',
			}

			if (skills) {
				// @ts-ignore
				context.included = skills.map(skill => {
					const SKILL_ATTRIBUTES = { ...skill }

					delete SKILL_ATTRIBUTES.id

					return {
						attributes: SKILL_ATTRIBUTES,
						id: skill.id,
						links: {
							self: `/unite/skills/${skill.id}`,
						},
						relationships: {
							pokemon: {
								data: {
									id: skill.pokemonID,
									type: 'pokemon',
								},
							},
						},
						type: 'skill',
					}
				})
			}
		} catch (error) {
			context.errors.push(error.message)
		}
	}
}
