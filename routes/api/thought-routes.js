// requiring the express router
const router = require("express").Router();

// importing Thought controller functions 
const { 
    getAllThoughts,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} = require("../../controllers/thought-controller");

// Thought Routes //

// (GET) path: localhost:3001/api/thoughts
router
    .route("/")
    .get(getAllThoughts)
    .post(createThought);

// (GET)(PUT)(DELETE) path: localhost:3001/thoughts/:id
router
    .route("/:id")
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought);

// (POST) path: localhost:3001/api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)


// (DELETE) path: localhost:3001/api/thoughts/:thoughtId/reactions/reactionId
router
    .route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
 

// export thought routes 
module.exports = router; 