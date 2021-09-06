/**
 * Sorts a pair of version strings.
 *
 * @param {string} versionA
 * @param {string} versionB
 *
 * @returns {*}
 */
function sort (versionA, versionB) {
	if (versionA === versionB) {
		return 0
	}

	const versionArrayA = versionA.split('.')
	const versionArrayB = versionB.split('.')

	const vA = Number(versionArrayA.shift())
	const vB = Number(versionArrayB.shift())

	if (vA > vB) {
		return 1
	}

	if (vA < vB) {
		return -1
	}

	if (!versionArrayA.length && !versionArrayB.length) {
		return 0
	}

	return sortVersions([versionArrayA.join('.'), versionArrayB.join('.')])
}

/**
 * Sorts dot-separated version strings of any length, such as `1.2.3.4`.
 *
 * @param {*} versionArray
 *
 * @returns {string[]}
 */
export function sortVersions (versionArray) {
	return [...versionArray].sort(sort)
}
