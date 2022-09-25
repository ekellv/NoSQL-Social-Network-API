// import Thought & User models 
const { Thought, User } = require('../models');

// Thought Controller 

const thoughtController = {
    // return all Thoughts 
    getThoughts(req, res) {
        Thought.find({})
            // populate thoughts w associated reactions 
            // select -__v to remove version key in returns 
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        },

    // return a Thought based on its ID
    getThoughtbyId({ params }, res ) {
        Thought.findOne({ _id: params.id })
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this ID.'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // create a new Thought
    createThought({ params, body}, res) {
        Thought.create(body)
        // use the user's ID to access the User array to update the Thoughts posted by the User if the Thought ID & Thought body is new
        .then(({_id}) => {
            return Users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true})
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this ID.'});
                return;
            }
            res.json(dbThoughtsData)
        })
            .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },






}