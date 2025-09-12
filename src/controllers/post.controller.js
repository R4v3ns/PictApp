const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

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
/**
 * Add a comment to a post
 */
const addComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        if (!content) {
            return res.status(400).json({ msg: "Content is required." });
        }

        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }

        const comment = await Comment.create({
            content,
            postId: post.id,
            userId
        });

        res.status(201).json({ msg: "Comment added successfully.", comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
}

/**
 * Get all comments for a post
 */
const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ msg: "Post not found." });
        }

        const comments = await Comment.findAll({
            where: { postId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'name']
                }
            ],
            order: [['createdAt', 'ASC']]
        });

        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
}

module.exports = {
    createPost,
    getPosts,
    addComment,
    getCommentsByPost
};