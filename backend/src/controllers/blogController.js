import BlogModel from '../models/blogModel.js';

// @desc    Get all blogs
// @route   GET /api/blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find({}).sort({ createdAt: -1 }); // يرجع الأحدث الأول
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
export const getBlogById = async (req, res) => {
    const blog = await BlogModel.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
};


// @desc    Create Blog
// @route   POST /api/blogs
export const createBlog = async (req, res) => {
    try {
        const blogData = { ...req.body };
        if (req.file) {
          blogData.image = req.file.filename;
        }
        const blog = await BlogModel.create(blogData);
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update Blog
// @route   PUT /api/blogs/:id
export const updateBlog = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
           updateData.image = req.file.filename;
        }
        const blog = await BlogModel.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.status(200).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete Blog
// @route   DELETE /api/blogs/:id
export const deleteBlog = async (req, res) => {
    try {
        await BlogModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'تم حذف المقال بنجاح' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};