import mongoose from "mongoose";
import User from "./User.js";

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: String,
    preparation: {
      ingredients: String,
      cooking: String,
      total: String,
    },
    instructions: [String],
    deleteAt: {
      type: Date,
      default: null,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
