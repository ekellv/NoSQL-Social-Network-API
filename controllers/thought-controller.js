// import Thought & User models 
const { Thought, User } = require('../models');

// Thought Controller 

const thoughtController = {
    // return all Thoughts 
    getThoughts(req, res) {
        Thought.find({})
            // populate thoughts w associated reactions 
            .populate({path: 'reactions', select: '-__v'})
            // removes the version key in the returned thoughts
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
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
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thoughts found with this ID.'});
                return;
            }
            res.json(dbThoughtData)
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
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thoughts found with this ID.'});
                return;
            }
            res.json(dbThoughtData)
        })
            .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update a single thought using its ID
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this ID.' });
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });        
    },

    // delete a single thought using its ID
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts found with this ID.' });
                return;
            }
                res.json(dbThoughtData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });        
    },

    // add a new reaction to a thought
    addReaction({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with this ID.' });
            return;
        }
        res.json(dbThoughtData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });  
    },

    // delete a single reaction using its ID
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, (new: true))
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with this ID.' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });  
    }
};

// export Thought Controller 

module.exports = thoughtController;