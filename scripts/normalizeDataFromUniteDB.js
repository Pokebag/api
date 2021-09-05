// Module imports
import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'





function convertPokemonNameToID(name) {
	return name.toLowerCase().replace(/\W/g, '-')
}

function fetchJSON(url, options = {}) {
	return fetch(url, options)
		.then(response => response.json())
}

function normalizeSkill(options) {
	const {
		parentSkill,
		pokemonID,
		skill,
		skillHash,
		types,
	} = options

	const skillID = `${pokemonID}-${skill.name.toLowerCase().replace(/\s/g, '-')}`

	// slot 0 === passive ability
	// slot 1 === basic attack
	// slot 2 === special attack 1
	// slot 3 === special attack 2
	// slot 4 === unite
	let slot = null

	if (parentSkill) {
		slot = parentSkill.slot
	} else {
		switch(skill.ability) {
			case 'Passive':
				slot = 0
				break

			case 'Basic':
				slot = 1
				break

			case 'Move 1':
				slot = 2
				break

			case 'Move 2':
				slot = 3
				break

			case 'Unite Move':
				slot = 4
				break
		}
	}

	skill.displayName = skill.name
	skill.id = skillID
	skill.requires = []
	skill.slot = slot

	const moveType = types.indexOf(skill.type)
	if (skill.type) {
		if (moveType !== -1) {
			skill.type = moveType
		} else {
			types.push(skill.type)
			skill.type = skill.type.length - 1
		}
	}

	if (parentSkill) {
		skill.requires.push(`pokemon.hasSkill('${parentSkill.id}')`)
	}

	if (skill.upgrades) {
		skill.upgrades.forEach(upgrade => normalizeSkill({
			parentSkill: skill,
			pokemonID,
			skill: upgrade,
			skillHash,
			types,
		}))
	}

	if (skill.cd || skill.cd1) {
		skill.cooldown = parseFloat(skill.cd || skill.cd1)
	}

	if (skill.description2 && skill.level2) {
		const tempSkillID = `${skillID}+`
		skillHash[tempSkillID] = {
			cooldown: skill.cooldown,
			displayName: `${skill.displayName}+`,
			description: `${skill.description1}\n\n${skill.description2}`,
			id: tempSkillID,
			requires: [
				...skill.requires,
				`pokemon.lvl >= ${skill.level2}`,
			],
			slot,
			type: skill.type,
		}
	}

	if (skill.description1 && skill.level1) {
		skill.description = skill.description1
		skill.requires.push(`pokemon.lvl >= ${skill.level1}`)
	}

	if (skill.level) {
		skill.requires.push(`pokemon.lvl >= ${skill.level}`)
	}

	delete skill.ability
	delete skill.cd
	delete skill.cd1
	delete skill.description1
	delete skill.description2
	delete skill.level
	delete skill.level1
	delete skill.level2
	delete skill.name
	delete skill.upgrades

	skillHash[skillID] = skill
}

async function normalizeDataFromUniteDB() {
	const moveTypes = []
	const pokemon = {}
	const skills = {}

	const [
		pokemonDatasets,
		statsDatasets,
	] = await Promise.all([
		fetchJSON('https://unite-db.com/pokemon.json'),
		fetchJSON('https://unite-db.com/stats.json'),
	])

	pokemonDatasets.forEach(pokemonData => {
		if (pokemonData.name === 'Ninetales') {
			pokemonData.name = 'Alolan Ninetales'
		}

		const pokemonID = convertPokemonNameToID(pokemonData.name)

		pokemonData.damageType = pokemonData.damage_type.toLowerCase()
		pokemonData.displayName = pokemonData.name
		pokemonData.ratings = pokemonData.stats

		pokemonData.skills.forEach(skill => normalizeSkill({
			pokemonID,
			skill,
			skillHash: skills,
			types: moveTypes,
		}))

		delete pokemonData.builds
		delete pokemonData.damage_type
		delete pokemonData.id
		delete pokemonData.name
		delete pokemonData.skills
		delete pokemonData.stats
		delete pokemonData.soon
		delete pokemonData.tier
		delete pokemonData.true_stats

		pokemon[pokemonID] = pokemonData
	})

	statsDatasets.forEach(statsData => {
		if (statsData.name === 'Ninetales') {
			statsData.name = 'Alolan Ninetales'
		}
		const pokemonID = convertPokemonNameToID(statsData.name)
		pokemon[pokemonID].stats = statsData.level.map(statBlock => {
			statBlock.spAttack = statBlock.sp_attack
			statBlock.spDefense = statBlock.sp_defense
			delete statBlock.sp_attack
			delete statBlock.sp_defense
			return statBlock
		})
	})

	const dataFilesPath = path.resolve(process.cwd(), 'packages', 'api', 'data', 'unite', 'base')
	const pokemonFilesPath = path.resolve(dataFilesPath, 'pokemon')
	const skillsFilesPath = path.resolve(dataFilesPath, 'skills')

	await Promise.all(Object.entries(pokemon).map(([pokemonID, pokemonData]) => {
		const destinationFilepath = path.resolve(pokemonFilesPath, `${pokemonID}.json`)
		const dataString = JSON.stringify(pokemonData, null, 2)

		return fs.writeFile(destinationFilepath, dataString, 'utf-8')
	}))

	await Promise.all(Object.entries(skills).map(([skillID, skillData]) => {
		const destinationFilepath = path.resolve(skillsFilesPath, `${skillID}.json`)
		const dataString = JSON.stringify(skillData, null, 2)

		return fs.writeFile(destinationFilepath, dataString, 'utf-8')
	}))

	console.log(Object.entries(moveTypes))
}





normalizeDataFromUniteDB()
