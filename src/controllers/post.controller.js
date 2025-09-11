const Post = require('../models/post');
const User = require('../models/user');

/**
 * Create a new post
 */
const createPost = async (req, res) => {
    const { title, content, image } = req.body;
    const userId = req.user.id; // Obtener el ID del usuario autenticado

    try {
        // Validation of the required data
        if (!title || !content || !image) {
            return res.status(400).json({ msg: "Title, content and image are required." });
        }

        // Create the post
        const post = await Post.create({
            "title": title,
            "content": content,
            "image": image,
            "userId": userId
        });

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