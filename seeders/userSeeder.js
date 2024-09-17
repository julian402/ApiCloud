import connectDB from "../config/db.js";
import User from "../models/User.js";
import "dotenv/config";

async function userSeeder() {
  connectDB();
  await User.create({
    firstName: "Juan",
    lastName: "Mateo",
    email: "juanmateo@gmail.com",
    password: process.env.USER_PASSWRD_SEEDER,
    age: 25,
  });
  await User.create({
    firstName: "Maria",
    lastName: "Mateo",
    email: "mariamateo@gmail.com",
    password: process.env.USER_PASSWRD_SEEDER,
    age: 25,
  });
  await User.create({
    firstName: "Pedro",
    lastName: "Mateo",
    email: "pedro@gmail.com",
    password: process.env.USER_PASSWRD_SEEDER,
    age: 25,
  });
  console.log("Test Users [Seeder] successfully created!");
  process.exit(1);
}

userSeeder();
