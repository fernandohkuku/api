const router = require("express").Router()

const handle = require("../handlers")

const auth = require("../middlewares/auth")



router.route("/")
.get(handle.showFertilizers)
.post(handle.createFertilizer)


router.route("/:id")
.get(handle.getFertilizer)
.put(handle.updateFertilizer)
.delete(handle.deleteFertilizer)


module.exports = router