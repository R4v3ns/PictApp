const { Router } = require('express');

// Importar todas las rutas
const userRoutes = require('./user.routes');
const postRoutes = require('./post.routes');
const likeRoutes = require('./like.routes');
const commentRoutes = require('./comment.routes');

const router = Router();

// Configurar las rutas con sus prefijos
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/likes', likeRoutes);
router.use('/comments', commentRoutes);

module.exports = router;