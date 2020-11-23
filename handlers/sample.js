const db = require('../models')
const HashMap = require('hashmap')


exports.createSample = async (req, res, next) => {
    try {
        const { id } = req.decode

        const user = await db.User.findById(id)

        req.body.user = user._id.toString()

        const sample = await db.Sample.create(req.body)

        user.sample.push(sample._id)

        await user.save()

        res.status(201).json({ ...sample._doc, user: user._id })
        
    } catch (error) {
        if (error.code === 11000) {
            error.message = "Sorry, that crop exist"
        }
        next(error)
    }
}

exports.showSamples = async (req, res, next) => {
    try {
        const samples = await db.Sample.find()
            .populate({ path: "user", populate: { path: "sample" } }).populate("crop")
        res.status(200).json(samples)
    } catch (error) {
        error.status = 400
        next(error)

    }
}

exports.userSamples = async (req, res, next) => {
    try {
        const { id } = req.decode

        const user = await db.User.findById(id)
            .populate({ path: "sample", populate: { path: "crop" } })

        const { _id, name, username, sample } = user

        res.status(200).json({ _id, name, username, sample })


    } catch (error) {
        error.status = 400
        next(error)
    }
}


exports.getSample = async (req, res, next) => {
    try {
        const { id } = req.params

        const sample = await db.Sample.findById(id)
            .populate({ path: "crop", populate: "nutrient" }).populate("user", ["id", "name"])

        if (!sample) throw new Error("sample not found")

        res.status(200).json(sample)

    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.updateSample = async (req, res, next) => {
    try {
        const { id: sampleId } = req.params
        
        const { id: userId } = req.decode

        const sample = await db.Sample.findById(sampleId)

        if (!sample) throw new Error("sample not found")

        if (sample.user.toString() !== userId) {
            throw new Error("Unauthorized access")
        }

        const response = await db.Sample.findByIdAndUpdate({
            _id: sampleId
        }, req.body, { new: true })
            .populate({ path: "crop", populate: "nutrient" })
            .populate("user", ["id", "name"])

        res.status(200).json(response)

    } catch (error) {
        error.status = 400
        next(error)
    }
}


exports.deleteSample = async (req, res, next) => {
    try {
        const { id: sampleId } = req.params

        const { id: userId } = req.decode

        const sample = await db.Sample.findById(sampleId)

        if (!sample) throw new Error("sample not found")

        if (sample.user.toString() !== userId) {
            throw new Error("Unauthorized access")
        }

        await sample.remove()

        res.status(200).json(sample)

    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.sendResultSample = async (req, res, next) => {
    try {
        const { id: userId } = req.decode

        const { id: sampleId } = req.params

        const sample = await db.Sample.findById(sampleId)
            .populate({ path: "crop", populate: "nutrient" })

        if (!sample) throw new Error("sample not found")

        if (sample.user.toString() !== userId) {

            throw new Error("Unauthorized access")
        }
    
        const { crop } = sample

        const { nutrient } = crop

        if (!nutrient) throw new Error("sample has not nutrients")

        var map_sample = new HashMap()

        map_sample.set("nitrogen", sample.nitrogen)
        map_sample.set("phosphorus", sample.phosphorus)
        map_sample.set("potassium", sample.potassium)
        map_sample.set("sulfur", sample.sulfur)
        map_sample.set("calcium", sample.calcium)
        map_sample.set("magnesium", sample.magnesium)

        var map_crop = new HashMap()

        map_crop.set("nitrogen", nutrient.nitrogen)
        map_crop.set("phosphorus", nutrient.phosphorus)
        map_crop.set("potassium", nutrient.potassium)
        map_crop.set("sulfur", nutrient.sulfur)
        map_crop.set("calcium", nutrient.calcium)
        map_crop.set("magnesium", nutrient.magnesium)

        var array_faltante = []
        var array_recomendado = []
    
        await map_crop.forEach((value, key) => {
            if (this.diff(value, map_sample.get(key)) > 0) {
                var result = {}       
                var recomend = {}
                result[key] = this.diff(value, map_sample.get(key))
                recomend[key] = value
                array_faltante.push(result)
                array_recomendado.push(recomend)
                
            }
        })
     
        res.status(200).json({faltantes:array_faltante, recomendado:array_recomendado})
    } catch (error) {
        error.status = 400
        next(error)
    }
}

exports.diff = (n1, n2) => {
    if (n1 > n2) {
        return n1 - n2
    } else {
        return 0
    }
}