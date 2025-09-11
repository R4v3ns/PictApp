const { Post } = require('../models/post');
const { User } = require('../models/user');

/**
 * Create a new post
 */
const createPost = async (req, res) => {
    const { userId, title, content } = req.body;

    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Validation of the null data
        if (!userId || !title || !content) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        // Create the post
        const post = await Post.create({ userId, title, content });

        res.status(201).json({ msg: "Post created successfully.", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
}

/**
 * Get all posts
 */
const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
}

module.exports = {
    createPost,
    getPosts
};