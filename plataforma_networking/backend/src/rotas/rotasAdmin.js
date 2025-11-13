import express from "express"
import AdminController from "../controllers/adminController.js"
const rotasAdmin = express.Router()

rotasAdmin.post("/admin/login", AdminController.loginAdmin)

export default rotasAdmin