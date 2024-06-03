const { body, param } = require('express-validator')
const plant_service = require('../../services/plant')

const addPlantValidation = () => {
	return [
		body('plantName').notEmpty()
			.withMessage('Plant name can not be empty')
			.isLength({ min: 2, max: 225 })
			.withMessage('Plant name can be between 2 and 225 characters long'),
		body('plantType').notEmpty().withMessage('Plant type can not be empty'),
		body('plantingDate').notEmpty()
			.withMessage('Planting date can not be empty')
			.matches(
				/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,
				'g'
			)
			.withMessage(
				'Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'
			),
		body('plantLocation').notEmpty().withMessage('Plant location can not be empty'),
	]
}

const deletePlantValidation = () => {
	return [
		param('id').custom(async id => {
			const exists = await plant_service.getById(id)
			if (!exists) {
				throw new Error('Plant was not found')
			}
		}),
	]
}

const updatePlantValidation = () => {
	return [
		param('id').custom(async id => {
			const exists = await plant_service.getById(id)
			if (!exists) {
				throw new Error('Plant was not found')
			}
		}),
		body('plantName').notEmpty()
			.withMessage('Plant name can not be empty')
			.isLength({ min: 2, max: 225 })
			.withMessage('Plant name can be between 2 and 225 characters long'),
		body('plantType').notEmpty().withMessage('Plant type can not be empty'),
		body('plantingDate').notEmpty()
			.withMessage('Planting date can not be empty')
			.matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d\s([01][0-9]|2[0-3]):([0-5][0-9])$/,'g')
			.withMessage(
				'Invalid date and time format. Please use "DD/MM/YYYY HH:mm" format.'
			),
		body('plantLocation').notEmpty().withMessage('Plant location can not be empty'),
	]
}

module.exports = {
	addPlantValidation,
	updatePlantValidation,
	deletePlantValidation,
}
