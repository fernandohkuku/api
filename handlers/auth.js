const db = require("../models")
const jwt = require("jsonwebtoken")

exports.register = async(req, res, next) => {
    try {
        const user = await db.User.create(req.body)

        const {id, name, username} = user
        
        
        const token = jwt.sign({id, name, username}, process.env.SECRET)

        res.status(201).json({id, name, username, token})
    } catch (error) {
        if(error.code ===11000){
            error.message = "Sorry, that username is already taken"
        }
        next(error)
    }
}

exports.login = async(req, res ,next) =>{
    try {
        const user = await db.User.findOne({username:req.body.username})
        const {id, name, username} = user
        const valid = await user.comparePassword(req.body.password)
        
        if(valid){
            const token = jwt.sign({id, name, username}, process.env.SECRET)
            res.json({
                id,
                name,
                username, 
                token
            })
        }else{
            throw new Error()
        }
    } catch (error) {
        error.status = 400
        error.message ="Invalid username/password"
        next(error)
    }
}