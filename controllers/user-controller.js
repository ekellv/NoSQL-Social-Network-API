// require User model 
const { User } = require('../models');

// User Controller

const userController = {
    // return all Users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
  },


    // return a User based on its ID
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: "thoughts",
            select: "-__v",
        })
        .select("-__v")
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID." });
            return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a new User
    createUser({ body }, res) {
        User.create(body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err));
    },

    // update a User
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then((dbUserData) => {
            if (!dbUserData) {
                res
                .status(404)
                .json({ message: "No user found with this ID." });
                return;
            }
            res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
        },

    // delete a single User through its ID
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if (!dbUserData) {
            res.status(404).json({ message: "No user found with this ID." });
            return;
            }
            res.json(dbUserData);
        })
            .catch((err) => res.status(400).json(err));
        },


    // add a friend for a specific user by using the User's id
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendsId } },
            { new: true }
            )
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(400).json(err));
        },

    // delete a single user's friend
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendsId } },
            { new: true }
            )
            .then((dbUserData) => {
                if (!dbUserData) {
                res.status(404).json({ message: "no user found with this ID" });
                return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
        },
};

// export User controller
module.exports = userController;