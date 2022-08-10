require("dotenv").config();
const UserSchema = require("./model/user");
const bcrypt = require("bcrypt");
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
app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("all inputs are required");
    }
    const oldUser = await UserSchema.findOne({ email });
    if (oldUser) {
      return res.status(409).send("user already exists");
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
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

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("email and password are required");
    }
    const user = await UserSchema.findOne({ email });
    const ps = await bcrypt.compare(password, user.password)
    console.log(ps);
    if (user && (await bcrypt.compare(password, user.password))) {
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
const port = process.env.PORT || 6000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
module.export = app;
