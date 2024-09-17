import { expressjwt } from "express-jwt";
import express from "express";
import userController from "../controllers/userController.js";
import "dotenv/config";

const router = express.Router();

router.get("/api/users", userController.getAll);
router.get(
  "/api/user/my-recipe",
  expressjwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  userController.getMyRecipe
);
router.post("/api/users", userController.create);

export default router;
