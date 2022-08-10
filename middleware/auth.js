const jwt=require("jsonwebtoken");
const config=process.env;
const verifytoken=(req,res,next)=>{
    const token= req.body.token;
    if(!token){
        return res.status(403).send("token is required");
    }
    try{
        const decoded=jwt.verify(token,config.TOKEN_KEY);
        req.user=decoded;
    }catch(err){
        return res.status(401).send("invalid token")
    }
    return next();
}
module.exports=verifytoken;