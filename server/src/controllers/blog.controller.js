import { Blog } from "../models/index.js";

export const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();

      return res.status(200).json({ ok: true, blogs });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
  getBlogBySlug: async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug });

      return res.status(200).json({ ok: true, blog });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
    }
  },
  createBlog: async (req, res) => {
    try {
      const blog = await Blog.create(req.body);

      return res.status(201).json({ ok: true, blog });
    } catch (error) {
      return res.status(500).json({ ok: false, error });
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
