import mongoose from "mongoose";
import bcrypt from "bcrypt"
const {Schema}=mongoose;
const postDetails=new Schema({
    imageUrl:{
        type:"string",
        required:true,
    },
    views:{
        type:Number,

    },
    liked:{
        type:Number
    },
    title:{
        type:"string",
        required:true,
    },
    description:{
        type:"string",
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel"
    },
    link:{
        type:Number
    }
    
},{
    timestamps: true,
});
// postDetails.pre('find', function updateViews(next) {
//     // console.log(this)
//     if (this && this.views !== undefined) {
//         this.views = this.views + 1;
//         console.log(this.views,this.title)
//     }
//     next();
// });
const PostModel=mongoose.model("PostModel",postDetails);
export default PostModel; 