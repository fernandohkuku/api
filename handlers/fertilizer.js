const db = require("../models")



exports.createFertilizer = async (req, res, next)=>{
    try {
        const fertilizer = await db.Fertilizer.create(req.body)
        const {id, name} = fertilizer
        res.status(201).json({id, name})
    } catch (error) {
        if (error.code === 11000) {
            error.message = "Sorry, that fertilizer exist"
        }
        next(error)
    }
}

exports.showFertilizers = async(req, res, next) => {
    try {
        const fertilizers = await db.Fertilizer.find()
        .populate("nutrient")
    
        if(!fertilizers) throw new Error("Fertilizes Not found")

        res.status(200).json(fertilizers)
        
    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.getFertilizer = async(req, res, next) =>{
    try {
        const {id} = req.params
        
        const fertilizer = await db.Fertilizer.findById(id)
        .populate("nutrient")
        
        if(!fertilizer) throw new Error("Fertilizer Not found")

        res.status(200).json(fertilizer)
    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.updateFertilizer = async(req, res, next)=>{
    try {
        const {id} = req.params
        const fertilizer = await db.Fertilizer.findByIdAndUpdate(
            {_id:id}, req.body, {new:true}    
        ).populate("nutrient")
        
        if(!fertilizer) throw new Error("fertilizer not found")

        res.status(200).json(fertilizer)
    } catch (error) {
        error.status =400
        next(error)
    }
}


exports.deleteFertilizer = async(req, res, next)=>{
    try {
        const {id} = req.params
        const fertilizer =  await db.Fertilizer.findById(id)
        if(!fertilizer) throw new Error("Fertilizer Not found")

        await fertilizer.remove()

        res.status(200).json(fertilizer)

    } catch (error) {
        error.status = 400
        next(error)
    }
}