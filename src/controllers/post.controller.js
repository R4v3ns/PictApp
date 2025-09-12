const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');

/**
 * Create a new post
 */
const createPost = async (req, res) => {
    const { image, imageFooter, location } = req.body;
    const userId = req.user.id;

    try {
        // Validation - solo image es obligatorio según tu modelo
        if (!image) {
            return res.status(400).json({ msg: "Image is required." });
        }

        // Create the post
        const post = await Post.create({
            image: image,
            imageFooter: imageFooter || null,
            location: location || null,
            userId: userId,
            likeCount: 0 // default value
        });

        res.status(201).json({ msg: "Post created successfully.", post });
    } catch (error) {
        console.error('CreatePost error:', error);
        res.status(500).json({ msg: "Server error.", error: error.message });
    }
}

/**
 * Get all posts
 */
const getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'userName', 'email']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json({ posts });
    } catch (error) {
        console.error('GetPosts error:', error);
        res.status(500).json({ msg: "Server error.", error: error.message });
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
            postId: parseInt(postId),
            userId
        });

        res.status(201).json({ msg: "Comment added successfully.", comment });
    } catch (error) {
        console.error('AddComment error:', error);
        res.status(500).json({ msg: "Server error.", error: error.message });
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
                    attributes: ['id', 'userName', 'email'] // Cambié 'username' por 'userName'
                }
            ],
            order: [['createdAt', 'ASC']]
        });

        res.status(200).json({ comments });
    } catch (error) {
        console.error('GetCommentsByPost error:', error);
        res.status(500).json({ msg: "Server error.", error: error.message });
    }
}

module.exports = {
    createPost,
    getPosts,
    addComment,
    getCommentsByPost
};