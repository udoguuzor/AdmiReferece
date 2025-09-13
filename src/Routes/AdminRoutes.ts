import express, { Router } from "express"
import { getAdmin, getAllAdmin, loginAdmin, signUpAdmin, updateAdmin } from "../controller/AdminController";

export const AdminRouter:Router = express.Router();

AdminRouter.post("/create", signUpAdmin);
AdminRouter.post("/login", loginAdmin);
AdminRouter.get("/getOne/:id", getAdmin);
AdminRouter.get("/getAll", getAllAdmin);
AdminRouter.patch("/update", updateAdmin)