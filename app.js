require("dotenv").config();
const UserSchema = require("./model/user");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const auth=require("./middleware/auth");
//const {User} = require("./model/user");
const m = require("./config/database");
m.connect();
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/register",cors(), async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("all inputs are required");
    }
    const oldUser = await UserSchema.findOne({ email });
    if (oldUser) {
      return res.status(409).send("user already exists");
    }
    const user = await UserSchema.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password
    });
    console.log(user);
    //create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    //save user token
    user.token = token;

    //return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});
// app.post("/login",(req,res)=>{

// });


app.get("/",cors(), async(req, res) => {
  return res.status(200).json({message:"Hello JWT!!"})
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("email and password are required");
    }
    const user = await UserSchema.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      user.token = token;
      return res.status(200).send(user);
    }
    //res.setHeader("Content-Type","text")
    res.status(400).send("invalid");
  } catch (err) {
    console.log(err);
  }
});


app.post("/welcome",auth,(req,res)=>{
  res.status(200).send("welcome");

})

app.listen(process.env.PORT || 6000, () => {
  console.log(`server running on port ${process.env.PORT || 6000}`);
});
