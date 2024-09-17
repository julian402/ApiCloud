import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

async function create(req, res) {
  //const hash = await bcrypt.hash(req.body.password, 10);
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password, // hash
      email: req.body.email,
      age: req.body.age,
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating user" });
  }
}

async function getAll(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting users" });
  }
}

async function getMyRecipe(req, res) {
  try {
    const user = await User.findById(req.auth.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error getting recipes" });
  }
}

export default {
  create: create,
  getAll: getAll,
  getMyRecipe: getMyRecipe,
};
