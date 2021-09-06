// Module imports
import {
	getPokemon,
	getSkills,
} from '@pokebag/data-sdk'





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
			let includes = context.query.include
			let pokemon = null
			let skills = null

			if (!Array.isArray(includes)) {
				includes = [includes]
			}

			pokemon = await getPokemon({ patch: context.params.patchVersion })

			if (includes.includes('skills')) {
				skills = await getSkills({ patch: context.params.patchVersion })
			}

			context.data = pokemon.map(mon => {
				const attributes = { ...mon }

				delete attributes.id

				const relationships = {
					skills: {
						links: {
							related: `/unite/skills?filter[pokemon]=${mon.id}`,
						},
					},
				}

				if (skills) {
					relationships.skills.data = skills.reduce((accumulator, skill) => {
						if (skill.id.startsWith(mon.id)) {
							accumulator.push({
								id: skill.id,
								type: 'skill',
							})
						}

						return accumulator
					}, [])
				}

				return {
					attributes,
					id: mon.id,
					relationships,
					type: 'pokemon',
				}
			})

			if (skills) {
				// @ts-ignore
				context.included = skills.map(skill => {
					const attributes = { ...skill }

					delete attributes.id

					const OWNER = pokemon.find(mon => {
						return skill.id.startsWith(mon.id)
					})

					return {
						attributes,
						id: skill.id,
						links: {
							self: `/unite/skills/${skill.id}`,
						},
						relationships: {
							pokemon: {
								data: {
									id: OWNER.id,
									type: 'pokemon',
								},
								links: {
									self: `/unite/pokemon/${OWNER.id}`,
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
