const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const FloorRouter = require('./FloorRouter')
const typeRouter = require('./typeRouter')
const categoryRouter = require('./categoryRouter')
const historyRouter = require('./historyRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/floor', FloorRouter)
router.use('/category', categoryRouter)
router.use('/device', deviceRouter)
router.use('/his', historyRouter)

module.exports = router
