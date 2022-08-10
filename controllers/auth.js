const User=require("../models/User");
exports.signup=async(req,res)=>{
    const {email}=req.body;
    const UserExist=await User.findOne({email});
    if(UserExist){
        res.send("email already exist",400)
    }
    try{
        const user=await User.create(req.body);
        res.status(201).json({
            success:true.valueOf.
            user
        })
    }catch(error){
        console.log(error);
    }
}
exports.signin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            res.send("email and passsword are required",400)
        }
        //check email
        const user=await User.findOne({email});
        if(!user){
            res.send("invalid credentials",400)
        }
        const isMatched=await user.comparePassword(password);
        if(!isMatched){
            res.send("inavalud credentials",400)
        }
        generateToken(user,200,res);
    }
    catch(error){
        console.log(error);
        res.send("cannot login",400)
    }
}
const generateToken=async(user,statusCode,res)=>{
    const token=await user.jwtGenerateToken();
    const options={
        httpOnly:true,
        expiresIn:new Date(Date.now()+ProcessingInstruction.env.EXPIRE_TOKEN)
    };
    res
    .status(statusCode)
    .json({success:true,token})

}
//logout
exports.logout=(req,res)=>{
    res.status(200).json({
        success:true,
        message:"logged out"
    })
}