const { Category } = require('../models/models')
const ApiError = require('../error/ApiError')

class CategoryController {
	async create(req, res) {
		const { name, floorId } = req.body
		const category = await Category.create({ name, floorId })
		return res.json(category)
	}

	async getAll(req, res) {
		const categorys = await Category.findAll()
		return res.json(categorys)
	}
}

module.exports = new CategoryController()
