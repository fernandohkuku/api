const db = require('../models')

exports.createNutrient = async (req, res, next) => {
    try {
        var nutrient =null 
        const {id} = req.params
        const crop = await db.Crop.findById(id)
        const fertilizer = await db.Fertilizer.findById(id)
        if(crop){
            
            if(!crop.nutrient) nutrient = await db.Nutrient.create(req.body)
            
            if(crop.nutrient) nutrient = await db.Nutrient.findByIdAndUpdate({_id:crop.nutrient._id}, req.body, {new:true})
            
            crop.nutrient = nutrient.id
            
            const response =  await db.Crop.findByIdAndUpdate(
                {_id:id}, crop, {new:true}
            ).populate("nutrient")
            
            res.status(201).json({response})
        }
        if(fertilizer){
            
            if(!fertilizer.nutrient) nutrient = await db.Nutrient.create(req.body)
            
            if(fertilizer.nutrient) nutrient = await db.Nutrient.findByIdAndUpdate({_id:fertilizer.nutrient._id}, req.body, {new:true})

            fertilizer.nutrient = nutrient.id
            
            const response = await db.Fertilizer.findByIdAndUpdate(
                {_id:id}, fertilizer, {new:true}
            ).populate("nutrient")
            
            res.status(201).json({response})
        }
        if(!fertilizer || !crop){
            throw new Error("Fertilizer o crop not found")
        }

    } catch (error) {
        if (error.code === 11000) {
            error.message = "Sorry, that crop exist"
        }
        error.status = 400
        next(error)
    }
}