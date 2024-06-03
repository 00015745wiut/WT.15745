const express = require('express')
const { validationResult } = require('express-validator')
const {
	addPlantValidation,
	updatePlantValidation,
	deletePlantValidation,
} = require('../../../validators/plant')

const router = express.Router()
const plant_controller = require('../../../controllers/api/plant')

router.get('/', (req, res) => {
	plant_controller.getAll(req, res)
})

router.post('/', addPlantValidation(), (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	plant_controller.create(req, res)
})

router.put('/:id', updatePlantValidation(), (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	plant_controller.update(req, res)
})

router.delete('/:id', deletePlantValidation(), (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	plant_controller.delete(req, res)
})

module.exports = router
