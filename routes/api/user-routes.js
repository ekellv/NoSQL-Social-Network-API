// requiring express router 
const router = require('express').Router();

// importing User controller functions
const {
    getAllUsers,
    getUserById, 
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// (GET)(POST) route paths: localhost:3001/api/users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

// (GET)(PUT)(DELETE) route paths: localhost:3001/api/users/:id
router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// (POST)(DELETE) route paths: localhost:3001/api/users/:userId/friends/:friendId 

router
router
    .route("/:id/friends/:friendsId")
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;