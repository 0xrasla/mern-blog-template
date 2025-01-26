import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { generateToken } from "../utils/jwt.js";

export const userController = {
  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res
          .status(400)
          .json({ message: "User already exists", status: false });
      }

      const user = new User({ name, email, password });
      await user.save();
      res
        .status(201)
        .json({ user, status: true, message: "User created successfully" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: e.message, status: false });
    }
  },
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid Credentials", status: false });
    }

    const token = generateToken(user);
    return res
      .status(200)
      .json({
        token,
        status: true,
        user: { name: user.name, email: user.email },
      });
  },
  async getUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: true });
    }
    return res.status(200).json({ user, status: true });
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    if (username) {
      user.username = username;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    await user.save();
    return res
      .status(200)
      .json({ user, status: true, message: "User updated successfully" });
  },
  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", status: false });
    }
    await user.remove();
    return res
      .status(200)
      .json({ message: "User deleted successfully", status: true });
  },
};
