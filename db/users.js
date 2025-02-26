const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const Schema=mongoose.Schema({
    name:String,
    mail:String,
    password:String
})

Schema.pre('save',async function(next){
    // const salt = await bcrypt.genSalt(10);
    // this.password = await bcrypt.hash(this.password, salt);
    // next();

    console.log("Pre-save Hook - this: ", this);
    if (!this.password) {
        console.error("Password is missing!");
        return next(new Error("Password is missing!"));
    }

    try {
        const salt = await bcrypt.genSalt(10);  // Ensure salt rounds are valid
        console.log("Generated Salt: ", salt);
        
        this.password = await bcrypt.hash(this.password, salt);  // Hash the password
        next();
    } catch (err) {
        console.error("Error in password hashing: ", err);
        return next(err);  // Pass the error to the next middleware
    }
});

module.exports=mongoose.model('users',Schema);