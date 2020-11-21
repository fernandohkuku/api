const router = require("express").Router()

const handle = require("../handlers")

const auth = require("../middlewares/auth")


router.route("/:id")
.post(handle.createNutrient)


module.exports = router

