// express router
const router = require('express').Router();

// pulling in Thought & User routes 
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// route prefixes 
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// exporting routes
module.exports = router; 
