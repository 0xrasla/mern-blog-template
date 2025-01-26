import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token.split(" ")[0] !== "Bearer") {
    return res.status(401).json({ message: "Unauthorized" });
  }

  token = token.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
