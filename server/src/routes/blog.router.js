import { Router } from "express";
import { blogController } from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/:slug", blogController.getBlogBySlug);
blogRouter.post("/", blogController.createBlog);
blogRouter.put("/:slug", blogController.updateBlog);
blogRouter.delete("/:slug", blogController.deleteBlog);

export { blogRouter };
