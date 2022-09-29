// requiring express router 
const router = require('express').Router();

// importing User controller functions
const {
    getUsers,
    getUserbyId, 
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// (GET)(POST) route paths: localhost:3001/api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// (GET)(PUT)(DELETE) route paths: localhost:3001/api/users/:id
router
    .route('/:id')
    .get(getUserbyId)
    .put(updateUser)
    .delete(deleteUser);

// (POST)(DELETE) route paths: localhost:3001/api/users/:userId/friends/:friendId 

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;