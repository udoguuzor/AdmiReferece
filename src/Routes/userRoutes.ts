import express, { Router } from "express";
import mongoose from "mongoose";
import { deletAllUsers, deleteAUser, getALlUsers, getAUser, loginUser, signUp, updateUser } from "../controller/userController";

export const userRouter:Router = express();
userRouter.post("/create", signUp);
userRouter.post("/login", loginUser);
userRouter.get("/getOne/:id", getAUser);
userRouter.get("/getAll", getALlUsers);
userRouter.patch("/user", updateUser);
userRouter.delete("/deleteUser/:id", deleteAUser);
userRouter.delete("/deleteAll", deletAllUsers)