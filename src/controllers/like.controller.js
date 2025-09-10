const Like = require('../models/like');
const User = require('../models/user');

/**
 * Create a like
 */
const createLike = async (req, res) => {
    const { userId, postId } = req.body;

    try {
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Validation of the null data
        if (!userId || !postId) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        // Create the like
        const like = await Like.create({ userId, postId });

        res.status(201).json({ msg: "Like created successfully.", like });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
};

/**
 * Get all likes
 */
const getLikes = async (req, res) => {
    try {
        const likes = await Like.findAll();
        res.status(200).json({ likes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error." });
    }
};

module.exports = {
    createLike,
    getLikes
};