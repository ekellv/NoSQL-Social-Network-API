// dependencies imported
const { Schema, model, Types } = require('mongoose');
const formatDate = require('../utils/formatDate');

// Reaction Schema 
const ReactionSchema = new Schema({
    // requiring each reaction to have a custom ID
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal),
    },
},
{
    toJSON: {
        getters: true
    }
});

// Thought Schema 
const ThoughtSchema = new Schema ({
    thoughtText:{ 
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => formatDate(createdAtVal),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true,
    },
    id: false,
});

// setting virtual to return reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// use the Thought Schema to create the Thought Model 
const Thought = model('Thought', ThoughtSchema);

// exporting Thought Model 
module.exports = Thought; 