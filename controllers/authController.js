import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

async function login(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { prueba: "123", id: user.id },
          process.env.JWT_SECRET
        );
        return res.json({ token: token });
      }
    }
    return res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log(error);
  }
}

export default {
  login: login,
};
