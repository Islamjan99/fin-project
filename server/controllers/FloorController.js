const { Floor } = require('../models/models')
const ApiError = require('../error/ApiError')

class FloorController {
	async create(req, res) {
		const { name } = req.body
		const floor = await Floor.create({ name })
		return res.json(floor)
	}

	async getAll(req, res) {
		const Floors = await Floor.findAll()
		return res.json(Floors)
	}
}

module.exports = new FloorController()
