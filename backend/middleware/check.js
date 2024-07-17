import jwt from "jsonwebtoken";
import UserModel from "../Schema/userSchema.js";
async function check(req,res,next)
{
   try {
   if(!req.cookies.token)
   {
    return res.status(400).json({
        success:false,
        message:"token issue"
    })
   }
    let decoded = jwt.verify(req.cookies.token,process.env.SECURE);
    const id=await UserModel.find({email:decoded.email});
    req.user=id;
    next();
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })
   }
}
export default check;