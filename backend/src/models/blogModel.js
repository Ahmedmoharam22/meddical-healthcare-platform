import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    subTitle: {
      type: String,
      required: false, // أو شيل سطر الـ required خالص
    },
    content: {
      type: String,
      required: [true, "Please add the content"],
    },
    image: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    category: {
      type: String,
      required: [true, "Please specify a category (e.g., Medical, Health)"],
      default: "Medical",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
