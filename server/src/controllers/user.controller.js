import { User } from "../models/index.js";
import { compare, encrypt } from "../utils/encrypt.js";

export const userController = {
  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },
  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (user.password === password) {
      const token = generateToken(user);
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: "Invalid Credentials" });
  },
  async getUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  },
  async updateUser(req, res) {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    return res.status(200).json(user);
  },
  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    return res.status(200).json({ message: "User deleted successfully" });
  },
};
