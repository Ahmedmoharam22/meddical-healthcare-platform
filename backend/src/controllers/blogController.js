import Blog from '../models/blogModel.js';

// @desc    Get all blogs
// @route   GET /api/blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }); // يرجع الأحدث الأول
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
export const getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};