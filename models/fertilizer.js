const mongoose = require("mongoose")

const fertilizerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    nutrient:{
        type:mongoose.Schema.Types.ObjectId, ref:"Nutrient"
    }
})

module.exports = mongoose.model("Fertilizer", fertilizerSchema)