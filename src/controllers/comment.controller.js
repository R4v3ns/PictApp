const Comment = require('../models/comment');
const User = require('../models/user');

/**
 * Create a comment
 */
const createComment = async (req, res) => {
    const { userId, postId, content } = req.body;

    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Validation of the null data
        if (!userId || !postId || !content) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        // Create the comment
        const comment = await Comment.create({ userId, postId, content });

        res.status(201).json({ msg: "Comment created successfully.", comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
}

/**
 * Get all comments
 */
const getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
}

module.exports = {
    createComment,
    getComments
};