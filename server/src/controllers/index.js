import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { blogRouter } from "../routes/blog.router.js";
import { userRouter } from "../routes/user.router.js";

const baseRouter = Router();

baseRouter.use("/blog", authMiddleware, blogRouter);
baseRouter.use("/user", userRouter);

export default baseRouter;
