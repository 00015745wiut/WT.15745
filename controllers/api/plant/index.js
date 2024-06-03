// import specific service class
const plant_service = require('../../../services/plant')

// mention the service's needed actions (methods)
const plant_controller = {
	getAll(req, res) {
		res.json(plant_service.getAll())
	},
	create(req, res) {
		res.status(201).json(plant_service.create(req, res))
	},
	update(req, res) {
		const plant = plant_service.update(req.params.id, req.body)

		if (plant) {
			res.json(plant)
		} else {
			res.status(404).send('Plant was not found')
		}
	},
	delete(req, res) {
		const plant = plant_service.getById(req.params.id)

		if (plant) {
			plant_service.delete(req.params.id)
			res.status(204).send('Plant was deleted successfully')
		} else {
			res.status(404).send('Plant was not found')
		}
	},
}

module.exports = plant_controller
