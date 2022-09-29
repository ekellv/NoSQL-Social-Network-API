// require express router
const router = require('express').Router();

// pulling in api routes 
const apiRoutes = require('./api')

// route prefix
router.use('./api', apiRoutes);

// 404 message if there's an error in routing 
router.use((req,res) => {
    res.status(404).send('<h1>404 Error! Please try again!</h1>'); 
});

// exporting router 
module.exports = router; 