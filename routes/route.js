const express = require('express')
const router = express.Router()

const cookieParser = require('cookie-parser')
const { homePage, login } = require('../controller/userController')
const { userMiddleware } = require('../middleware/userMiddleware')


router.use(cookieParser())
router.get('/', homePage)

router.post('/login', userMiddleware, login)

module.exports = router