const mongoose = require('mongoose')

mongoose.set("debug", true)
mongoose.Promise = global.Promise
mongoose.connect("mongodb+srv://ferhkuku:PHYd4T5m3tXIPJgt@cluster0.whffu.mongodb.net/bd_predesuelo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true  })


module.exports.User = require("./user")
module.exports.Nutrient = require("./nutrient")
module.exports.Crop = require("./crop")
module.exports.Fertilizer = require("./fertilizer")
module.exports.Sample = require("./sample")