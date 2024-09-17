import Recipe from "../models/Recipe.js";
import User from "../models/User.js";

const getAll = async (req, res) => {
  try {
    const recipes = await Recipe.find({ deletedAt: null }).populate("user");
    return res.json(recipes);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "No recipes found" });
  }
};

const getById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    return res.json(recipe);
  } catch (error) {
    return res.status(404).json({ message: "No recipe found" });
  }
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      title: req.body.title,
      description: req.body.description,
      preparation: {
        ingredients: req.body.preparation.ingredients,
        cooking: req.body.preparation.cooking,
        total: req.body.preparation.total,
      },
      instructions: req.body.instructions,
      user: req.auth.id,
    });
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error creating recipe" });
  }
};

const updateRecipe = async (req, res) => {
  const recipeToUpdate = await Recipe.findById(req.params.id);
  if (recipeToUpdate !== null) {
    const { title, description, preparation, instructions } = req.body;
    recipeToUpdate.title = title || recipeToUpdate.title;
    recipeToUpdate.description = description || recipeToUpdate.description;
    recipeToUpdate.preparation.ingredients =
      preparation?.ingredients || recipeToUpdate.preparation.ingredients;
    recipeToUpdate.preparation.cooking =
      preparation?.cooking || recipeToUpdate.preparation.cooking;
    recipeToUpdate.preparation.total =
      preparation?.total || recipeToUpdate.preparation.total;
    recipeToUpdate.instructions = instructions || recipeToUpdate.instructions;
    await recipeToUpdate.save();
    return res.status(200).json(recipeToUpdate);
  } else {
    return res.status(404).json({ message: "No recipe found" });
  }
};

const deleteRecipe = async (req, res) => {
  const recipeToDelete = await Recipe.findById(req.params.id);
  if (recipeToDelete !== null) {
    await recipeToDelete.deleteOne();
    recipeToDelete.deleteAt = new Date();
    return res.status(200).json({ message: "Recipe deleted" });
  } else {
    return res.status(404).json({ message: "No recipe found" });
  }
};

export default {
  getAll: getAll,
  getById: getById,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  deleteRecipe: deleteRecipe,
};
