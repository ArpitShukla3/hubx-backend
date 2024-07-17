import UserModel from "../Schema/userSchema.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
export async function signup(req,res){
    if( !req.body.name|| !req.body.email|| !req.body.password)
    {
        return res.status(400).json({
            success:false,
            message:"all details are compulsory"
        })
    }
    //checking user existence
    if( await UserModel.findOne({email:req.body.email}))
    {
        return res.status(400).json({
            success:false,
            message:"user already exists"
        })
    }
    //email id verification is done in frontend and in backend also, but later
    try {
        const credential = new UserModel({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
        });
        credential.save();
        //creating tokens
        const token = jwt.sign({ email:req.body.email,password:req.body.password}, process.env.SECURE);
        const cookieOptions = {
            maxAge:7*24*60*60*1000,
            secure:true, 
            sameSite: 'None'
        }
        res.cookie ("token",token,cookieOptions);
        return res.status(200).json({
            succes:true,
            data:"credentials saved successfully"
        })
    } catch (error) {
        cconsole.log("error: ",error.message);
        return res.status(400).json({
            succes:true,
            data:"error occurred due to :"+error.message
        })
    }
}
export async function login(req,res){
    try {
        const user= await UserModel.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).json({
                succes:false,
                data:"enter correct email"
            })
        }
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match)
        {
            return res.status(400).json({
                succes:false,
                data:"enter correct password"
            })   
        }
        const token = jwt.sign({ email:req.body.email,password:req.body.password}, process.env.SECURE);
            const cookieOptions = {
                maxAge:7*24*60*60*1000,
                secure:true, 
                sameSite: 'None'
            }
            res.cookie ("token",token,cookieOptions);
            return res.status(200).json({
            succes:true,
            data:"success"
        })
    } catch (error) {
        return res.status(400).json({
            succes:false,
            data:"error:"+error.message
        })  
    }
   
}
export async function logout(req,res){
    try {
        const cookieOptions = {
            expires:new Date(),
            secure:true, 
            sameSite: 'None'
        }
        console.log(req.cookies.token)
        res.cookie("token",null,cookieOptions);
        return res.status(200).json({
            succes:true,
            data:" success"
        })
    } catch (error) {
        return res.status(400).json({
            succes:false,
            data:"error: "+error.message
        })
    }
}