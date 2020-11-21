const moongose = require("mongoose")

const nutrientSchema = new moongose.Schema({
    nitrogen:Number,
    phosphorus:Number,
    potassium:Number,
    sulfur:Number,
    calcium:Number,
    magnesium:Number,
    zinc:Number
})
module.exports = moongose.model("Nutrient", nutrientSchema)