const mongoose = require("mongoose")

const sampleSchema = new mongoose.Schema({
    nitrogen:Number,
    phosphorus:Number,
    potassium:Number,
    sulfur:Number,
    calcium:Number,
    magnesium:Number,
    crop:{
        type:mongoose.Schema.Types.ObjectId, ref:"Crop"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:"User"
    },
    latitud:Number,
    longitud:Number
})

module.exports = mongoose.model("Sample", sampleSchema)