// requiring mongoose package
const { Schema, model, trusted } = require('mongoose');

// User Schema 

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // regex to ensure user-entered email is a valid email structure 
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    // thoughts subdocument 
    thoughts: [
        {
            // get the thought object ID from the Thought model for each thought posted
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // friends subdocument
    friends: [
        {
            // get the User object ID from the User model for each friend
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        getters: true
    },
    id: false
});

// virtual returns total friend count for each user
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

// creating User model from the User Schema 
const User = model('User', UserSchema);

// exporting User model
module.exports = User;