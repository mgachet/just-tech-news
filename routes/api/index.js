const
    router = require('express').Router(),
    postRoutes = require('./post-routes'),
    userRoutes = require('./user-routes.js');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);

module.exports = router;