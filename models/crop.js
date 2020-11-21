const mongoose = require("mongoose")

const cropSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    nutrient:{
        type:mongoose.Schema.Types.ObjectId, ref:"Nutrient"
    }
})

module.exports = mongoose.model('Crop', cropSchema)