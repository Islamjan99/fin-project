const {History} = require('../models/models')
const ApiError = require('../error/ApiError');

class HistoryConroller {
    async postHistory(req, res, next) {
        try {

            const {userId, info, date, userName, userLastName, userEmail, userAddress, userPhone, OrderNumber} = req.body
            const history = await History.create({userId, info, date, userName, userLastName, userEmail, userAddress, userPhone, OrderNumber});
            return res.json(history)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            const hist = await History.findAll()
            return res.json(hist)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new HistoryConroller()