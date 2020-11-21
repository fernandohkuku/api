module.exports = {
    ...require("./auth"),
    ...require("./crop"),
    ...require("./nutrient"),
    ...require("./fertilizer"),
    ...require("./sample")
}


module.exports.notFound = (req, res, next) => {
    const err = new Error("Not found")
    err.status = 400
    next(err)
}

module.exports.errorHandler = (err, req, res, next) => {
    res.status(err.status||500).json({
        message: err.message || "something went wrong"
    })
}