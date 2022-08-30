const Router = require('express')
const router = new Router()
const FloorController = require('../controllers/FloorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), FloorController.create)
router.get('/', FloorController.getAll)

module.exports = router
