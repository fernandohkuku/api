const router = require("express").Router()

const handle = require("../handlers")

const auth = require("../middlewares/auth")

router.route("/")
.get(handle.showCrops)
.post(handle.createCrop)

router.route("/:id")
.get(handle.getCrop)
.put(handle.updateCrop)
.delete(handle.deleteCrop)

module.exports =router
