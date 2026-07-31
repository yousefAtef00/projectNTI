import { userModel } from "../../../db/models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { mailConfirmation } from "../../middleware/mailConfirmation.js";
async function signUp(req, res) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let addedUser = await userModel.insertMany(req.body);
    addedUser[0].password = undefined;
    try {
      await mailConfirmation(req.body.email);
    } catch (emailError) {
      console.log("erroe to send email", emailError.message);
    }

    res.status(201).json({ message: "user registered successfully", addedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function login(req, res) {
  try {
    let foundedUser = await userModel.findOne({ email: req.body.email });
    if (!foundedUser) return res.status(404).json({ message: "user not found" });

    if (foundedUser.isConfirmed === false)
      return res.status(401).json({ message: "please verify your email" });

    let matchedPass = bcrypt.compareSync(req.body.password, foundedUser.password);
    if (!matchedPass) return res.status(400).json({ message: "email or password incorrect" });

    let token = jwt.sign({ _id: foundedUser._id, role: foundedUser.role }, "nti");
    res.json({ message: "logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function getUsers(req, res) {
  try {
    let users = await userModel.find();
    res.json({ message: "all users", users });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "user not found" });
    updatedUser.password = undefined;
    res.json({ message: "user updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "user not found" });
    deletedUser.password = undefined;
    res.json({ message: "user deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "something went wrong", error: error.message });
  }
}

async function verifyAccount(req, res) {
  jwt.verify(req.params.mail, "ourMail", async (err, decoded) => {
    if (err) return res.status(400).json({ message: "invalid or expired link" });
    try {
      await userModel.findOneAndUpdate({ email: decoded.mail }, { isConfirmed: true });
      res.json({ message: "verified" });
    } catch (error) {
      res.status(500).json({ message: "something went wrong", error: error.message });
    }
  });
}

export{
    signUp,
    getUsers,
    login,
    updateUser,
deleteUser,verifyAccount
}