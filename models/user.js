const moongose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new moongose.Schema({
    name:String,
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default:Date.now
    },
    sample:[{
        type:moongose.Schema.Types.ObjectId, ref:"Sample"
    }]
})

userSchema.pre("save", async function(next){
    try {
        if(!this.isModified("password")){
            return next()
        }
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        return next()

    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function(attempt, next){
    try {
        return await bcrypt.compare(attempt, this.password)
    } catch (error) {
        next(error)
    }
}

module.exports = moongose.model("User", userSchema)