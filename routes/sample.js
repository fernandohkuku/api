const router = require("express").Router()

const handle = require("../handlers")

const auth = require("../middlewares/auth")



router.route("/")
.get(handle.showSamples)
.post(auth, handle.createSample)

router.get("/user", auth, handle.userSamples)

router.get("/result/:id", auth, handle.sendResultSample)

router.route("/:id")
.get(handle.getSample)
.put(auth, handle.updateSample)
.delete(auth, handle.deleteSample)


module.exports = router