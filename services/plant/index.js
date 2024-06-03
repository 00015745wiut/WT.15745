const fs = require('fs')

const plants = require(global.mock_db)

const plant_service = {
	getAll() {
		return plants
	},
	getById(id) {
		return plants.find(t => t.id == id)
	},
	create(req, res) {
		let new_id = genRandId(4)

		const plant = req.body

		const new_plant = {
			id: new_id,
			plant: plant,
		}

		plants.push(new_plant)

		writeToFile(plants)

		return new_plant
	},
	update(id, updateData) {
		const plantIndex = plants.findIndex(t => t.id == id)

		if (plantIndex === -1) {
			return null
		}

		plants[plantIndex].plant = {
			...plants[plantIndex].plant,
			...updateData,
		}

		writeToFile(plants)

		return plants[plantIndex]
	},
	delete(id) {
		const index = plants.findIndex(u => u.id == id)
		plants.splice(index, 1)
		writeToFile(plants)
	},
}

let writeToFile = async users => {
	await fs.writeFileSync(global.mock_db, JSON.stringify(users, null, 4), 'utf8')
}

let genRandId = count => {
	let result = ''
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const charactersLength = characters.length
	for (let i = 0; i < count; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength))
	}
	return result
}

module.exports = plant_service
