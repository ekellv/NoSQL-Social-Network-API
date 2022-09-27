// require User model 
const { User } = require('../models');

// User Controller

const userController = {
    // return all Users
    getUsers(req, res) {
        Users.find({})
        // populate each user with their thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate each user with their friends
        .populate({path: 'friends', select: '-__v'})
        // removes version key in the returned users
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // return a User based on its ID
    getUserbyId({params}, res) {
        User.findOne({ _id: params._id})
        // populate each user with their thoughts
        .populate({path: 'thoughts', select: '-__v'})
        // populate each user with their friends
        .populate({path: 'friends', select: '-__v'})
        // removes version key in the returned users
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID.'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a new User
    createUser({body}, res) {
        Users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // update a User
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

    // delete a single User through its ID
    deleteUser({params}, res) {
        User.findOneAndUpdate({ _id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID.'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

    // add a friend for a specific user by using the User's id
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: {friends: params.friendsId}}, {new: true})
        .populate({path: 'friends', select('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID.'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

    // update a single user's friends
    updateFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: {friends: params.friendsId}}, {new: true})
        .populate({path: 'friends', select('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this ID.'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
};

// export User controller
module.exports = userController;