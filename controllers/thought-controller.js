// import Thought & User models 
const { Thought, User } = require('../models');

// Thought Controller 

const thoughtController = {
    // return all Thoughts 
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
        },

    // return a Thought based on its ID
    getThoughtbyId({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this ID." });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
        },

    // create a new Thought
    createThought({ body }, res) {
        Thought.create(body)
            .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            })
            .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No thought found with this ID." });
                return;
            }
            res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    // update a single thought using its ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this ID." });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
        },

    // delete a single thought using its ID
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                res
                    .status(404)
                    .json({ message: "No thought found with this ID." });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.status(400).json(err));
        },

    // add a new reaction to a thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
            .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res
                .status(404)
                .json({ message: "No thought found with this ID." });
                return;
            }
            res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
        },

    // delete a single reaction using its ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
        },
};


// export Thought Controller 

module.exports = thoughtController;