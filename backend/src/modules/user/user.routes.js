import { checkEmail } from "../../middleware/checkEmail.js"
import { deleteUser, getUsers, login, signUp, updateUser, verifyAccount } from "./user.controller.js"

import express from "express"
export const userRoutes = express().router


userRoutes.use(express.json())

userRoutes.post("/users/signup", checkEmail,signUp)

userRoutes.post("/users/login", login)

userRoutes.get("/users",getUsers)
userRoutes.put("/users/:id",updateUser)
userRoutes.delete("/users/:id",deleteUser)
userRoutes.get("/users/verify/:mail",verifyAccount)
