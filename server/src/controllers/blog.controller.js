import { Blog } from "../models/index.js";
import { slugify } from "../utils/utils.js";

export const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find({
        author: req.user.id,
      }).populate("author");

      return res.status(200).json({ status: true, blogs });
    } catch (error) {
      return res.status(500).json({ status: false, error });
    }
  },
  getBlogBySlug: async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });

      return res.status(200).json({ status: true, blog });
    } catch (error) {
      return res.status(500).json({ status: false, error });
    }
  },
  createBlog: async (req, res) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.json({
          status: false,
          message: "Please provide title and content",
        });
      }

      const existing = await Blog.findOne({ title });
      if (existing) {
        return res.json({ status: false, message: "Blog already exists" });
      }

      const blog = await Blog.create({
        title,
        content,
        author: req.user.id,
        slug: slugify(title),
      });

      await blog.save();

      return res.status(201).json({ ok: true, blog, status: true });
    } catch (error) {
      return res.status(500).json({ ok: false, error, status: true });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findOneAndUpdate(
        { slug: req.params.slug },
        req.body,
        { new: true }
      );

      return res.status(200).json({ ok: true, blog });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const blog = await Blog.findOneAndDelete({ slug: req.params.slug });

      return res.status(200).json({ ok: true, blog });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
};
