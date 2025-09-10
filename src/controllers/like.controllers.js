const Like = require('../models/like');

// Crear un nuevo like
exports.createLike = async (req, res) => {
    try {
        const like = new Like(req.body);
        await like.save();
        res.status(201).json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los likes
exports.getLikes = async (req, res) => {
    try {
        const likes = await Like.find();
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un like por ID
exports.deleteLike = async (req, res) => {
    try {
        const { id } = req.params;
        const like = await Like.findByIdAndDelete(id);
        if (!like) {
            return res.status(404).json({ error: 'Like not found' });
        }
        res.json({ message: 'Like deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};