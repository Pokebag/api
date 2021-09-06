const MAX_HELD_ITEM_LEVEL = 30





/**
 * Uses the stats formula of a held item to calculate its stats through level 30.
 *
 * @param {object} item
 * @returns {object}
 */
export function calculateHeldItemStats (item) {
	const CALCULATED_STATS = {}

	let index = 0
	while (index < MAX_HELD_ITEM_LEVEL) {
		const LVL = index + 1

		CALCULATED_STATS[LVL] = {
			lvl: LVL,
			value: Object.entries(item.stats)
				.reduce((accumulator, [statID, statData]) => {
					const COMPLETE_FORMULA = statData.formula.replace(/\{lvl\}/u, LVL)

					// eslint-disable-next-line no-eval
					accumulator[statID] = parseFloat(eval(COMPLETE_FORMULA))

					if (statData.type === 'percentage') {
						accumulator[statID] = `${accumulator[statID]}%`
					}

					return accumulator
				}, {}),
		}

		index += 1
	}

	return CALCULATED_STATS
}
