// dependencies imported
const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// Reaction Schema 
const ReactionSchema = new Schema({
    // requiring each reaction to have a custom ID
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionText: {
        type: String,
        required: true,
        maxlength: 300
    },
    username: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
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
        maxlength: 500,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON:{
        virtuals: true,
        getters: true
    },
    id: false
});

// setting virtual to return reaction count
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// use the Thought Schema to create the Thought Model 
const Thought = model('Thought', ThoughtSchema);

// exporting Thought Model 
module.exports = Thought; 