const plant_service = require('../../../services/plant')

const home_controller = {
	index: async (req, res) => {
		res.render('home')
	},
	add: async (req, res) => {
		res.render('home/add_update', { mode: 'Add' })
	},
	update: async (req, res) => {
		const plantData = await plant_service.getById(req.params.id)
		res.render('home/add_update', { mode: 'Update', plantData: plantData })
	},
}

module.exports = home_controller
