const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type: String,
        required: [true, "Email is a required field"],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("invalid email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },

    tasksCount:{
         type:Number,
         default:0
    },

    tokens:{
        type:[{
            type:{
                token:{
                    type:String,
                    required:true
                }
            }  

        }]
    }

},{
    toJSON:{
         virtuals:true
    }
})


userSchema.pre("save",(next)=>{
    const user=this; 
    if(user.isModified("password")){
        this.password=bcrypt.hash(this.password,10);
    }
    next();

})

const User=new mongoose.model("users",userSchema);
module.exports=User;