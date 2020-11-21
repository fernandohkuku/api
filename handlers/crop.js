const db = require('../models')

exports.createCrop = async (req, res, next) => {
    try {
        const crop = await db.Crop.create(req.body)
        const { id, name } = crop
        res.status(201).json({ id, name })

    } catch (error) {
        if (error.code === 11000) {
            error.message = "Sorry, that crop exist"
        }
        next(error)
    }
}

exports.showCrops = async(req, res, next) => {
    try {
        const crops = await db.Crop.find()
        .populate("nutrient")
        res.status(200).json(crops)
    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.getCrop = async (req, res, next) => {
    try {
        const {id} = req.params
        const crop = await db.Crop.findById(id)
        .populate("nutrient")
        
        if(!crop) throw new Error("crop not found")
        
        res.status(200).json(crop)

    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.deleteCrop = async (req, res, next) => {
    try {
        const {id} = req.params
        const crop = await db.Crop.findById(id)

        if(!crop) throw new Error("crop not found")
        
        await crop.remove()

        res.status(200).json(crop)

    } catch (error) {
        error.status = 400
        next(err)
    }
}

exports.updateCrop = async (req, res, next) => {
    try {

        const {id} = req.params

        const crop = await db.Crop.findByIdAndUpdate(
            {_id:id}, req.body, {new:true}
        )
        
        if(!crop) throw new Error("crop not found")

        const {_id, name} = crop

        res.status(201).json({_id, name})
    } catch (error) {
        if (error.code === 11000) {
            error.message = "Sorry, that crop exist"
        }
        next(error)
    }
}


