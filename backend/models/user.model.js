// Importing Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// For email validation:
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Defining schema for User
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 
            'Error: Please fill a valid email address!']
    },
    password: {
        type: String,
        required: true,
    },
    utype : {
        type: String,
        required: true
    }
    
});


// Exporting the model
const User = mongoose.model('User', userSchema);
module.exports = User;