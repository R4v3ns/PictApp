const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Middleware de autenticación
 * Verifica el token JWT y añade la información del usuario al request
 */
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ msg: "Access token required." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verificar que el usuario existe y no está eliminado
        const user = await User.findByPk(decoded.id);
        if (!user || user.deleted) {
            return res.status(401).json({ msg: "Invalid token or user not found." });
        }

        // Añadir información del usuario al request
        req.user = {
            id: user.id,
            email: user.email,
            userName: user.userName
        };

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(403).json({ msg: "Invalid or expired token." });
    }
};

module.exports = {
    authenticateToken
};
