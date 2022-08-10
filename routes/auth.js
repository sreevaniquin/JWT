const express=require("express");
const router=express.Router();
const {signup,signin,logout}=require("../controllers/auth");
const {isAuthenticated}=require(")

router.post('/signup',signup);
router.post('/signup',signin);
router.get('/logout',isAuthenticated,logout);

module.exports=router;
