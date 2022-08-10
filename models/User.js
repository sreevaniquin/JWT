const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a Name'],
        maxlength:32
    },
    name:{
        type:String,
        required:[true,'please add a email'],
       unique:true,
       match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please add a valid email'
       ]
    },
    password:{
        type:String,
        required:[true,'please add a password'],
        
    },

},{timestamp:true});

userSchema.methods.jwtGenerateToken=function(){
    return jwt.sign({id:this.id},process.env.JWT_SECRET,{
        expiresIn:3600
    });
}

module.exports=mongoose.model("User",userSchema);