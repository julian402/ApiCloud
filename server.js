import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
const app = express();

app.use(express.json());

connectDB();

app.use(userRoutes);
app.use(authRoutes);
app.use(recipeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT} port`);
});
