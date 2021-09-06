/**
 * The `Route` class makes it simpler to create atomic routes to be attached
 * later to a Router.
 */
export class Route {
	/****************************************************************************\
	 * Class Properties
	\****************************************************************************/

	defaultOptions = {
		methods: ['get'],
	}

	path = null





	/****************************************************************************\
	 * Public Methods
	\****************************************************************************/

	/**
	 * Constructs a new Route.
	 *
	 * @param {object} options
	 * @param {string[]} [options.methods]
	 */
	constructor (options = {}) {
		this.options = {
			...this.defaultOptions,
			...options,
		}
	}

	/**
	 * Method to be executed when the route is hit.
	 *
	 * @abstract
	 * @param {object} context
	 */
	handler (context) { // eslint-disable-line no-unused-vars
		throw new Error('Must be implemented by route.')
	}

	/**
	 * Validate this route before attaching to a Router.
	 */
	validate () {
		if (typeof this.path === 'string') {
			throw new Error('path is required')
		}
	}





	/****************************************************************************\
	 * Getters
	\****************************************************************************/

	/**
	 * Returns a list of methods that are allowed for this route.
	 * @returns {string[]}
	 */
	get methods () {
		return this.options.methods
	}
}
