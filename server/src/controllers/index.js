import { Router } from "express";
import { blogRouter } from "../routes/blog.router.js";
import { userRouter } from "../routes/user.router.js";

const baseRouter = Router();

baseRouter.use("/blog", blogRouter);
baseRouter.use("/user", userRouter);

export default baseRouter;
