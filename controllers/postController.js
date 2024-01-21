import PostModel from "../Schema/postSchema.js";

export async function addImage(req,res)
{

    if(!req.body.title||!req.body.description||!req.body.img)
    {
        return res.status(400).json({
            success:false,
            message:"all fields are compulsory"
        })
    }
    try {
        const credential = new PostModel({
            title:req.body.title,
            description:req.body.description,
            views:0,
            liked:0,
            imageUrl:req.body.img,
            userId:req.user[0]._id
        });
       
        credential.save();
        return res.status(200).json({
            success:true,
            message:"successfully saved"
        }) 
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        })    
    }
   
}
export async function fetchImage(req,res)
{
   try {

    const res2 = await PostModel.find({userId:req.user[0]._id}).sort({ timestamp: -1 });
    const res3 = await PostModel.find({userId:req.user[0]._id},{},{skip:req.params.page*10,limit:req.params.page*10 + 10}).sort({ timestamp: -1 });
    console.log(res3);
    return res.status(200).json({
        success:true,
        data:res3
    })
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })   
   }
}
export async function updateView(req,res)
{
   try {
    const res2 = await PostModel.findByIdAndUpdate(req.body.id,{views:req.body.views});
    return res.status(200).json({
        success:true,
        data:res2
    })
   } catch (error) {
    return res.status(400).json({
        success:false,
        message:error.message
    })   
   }
}