const express = require("express")
const cookieRouter = express.Router()
const {acceptCookie} = require("../controller/cookie")

cookieRouter.post('/accept-cookie',acceptCookie)
module.exports = {cookieRouter}