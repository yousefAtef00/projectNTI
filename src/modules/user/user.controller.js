import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { mailConfirmation } from "../../middleware/mailConfirmation.js";
async function  signUp(req,res){
   mailConfirmation(req.body.email)
    req.body.password = bcrypt.hashSync(req.body.password,8)
    let addedUser = await userModel.insertMany(req.body)
    console.log(addedUser,"added");
    addedUser[0].password= undefined
    res.status(201).json({message:"user registered successfully", addedUser})
}

async function login(req,res){
    let foundedUser = await userModel.findOne({email:req.body.email})
    if(foundedUser){
       if(foundedUser.isConfirmed===false) return res.status(401).json({message:"please verify your email"})
      let matchedPass = bcrypt.compareSync(req.body.password,foundedUser.password)
      let token = jwt.sign({_id:foundedUser._id, role:foundedUser.role},"nti")
      if(matchedPass) return res.json({message:"logged in successfully",token})
        res.json({message:"email or password incorrect"})
    }else{
        res.json({message:"user not found"})
    }
}


async function getUsers(req,res){
    let users = await userModel.find()
    
    res.json({message:"all users", users})
}

async function updateUser(req, res) {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (updatedUser) {
    updatedUser.password = undefined;
    res.json({
      message: "user updated successfully",
      updatedUser,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
}
async function deleteUser(req, res) {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  if (deletedUser) {
    deletedUser.password = undefined;
    res.json({
      message: "user deleted successfully",
      deletedUser,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
}
 function verifyAccount(req,res){
    jwt.verify(req.params.mail,"ourMail", async(err,decoded)=>{
    let confirmUser =await userModel.findOneAndUpdate({email:decoded.mail},{isConfirmed:true})
    res.json({message:"verified"})
    })
   
}

export{
    signUp,
    getUsers,
    login,
    updateUser,
deleteUser,verifyAccount
}