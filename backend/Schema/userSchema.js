import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;
const user=new Schema({
    name:{
        type:"string",
        required:true,
    },
    password:{
        type:"string",
        required:true,
    },
    email:{
        type:"string",
        required:true,
    },
});

user.pre('save',async function(next)
{
    if(!this.isModified('password'))
    {
             next();
    }
        this.password= await bcrypt.hash(this.password,10);
        next();
});
const UserModel=mongoose.model("UserModel",user);
export default UserModel; 