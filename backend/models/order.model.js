// Importing Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For email validation:
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// Defining schema for product
const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true,
        trim: true
    }
}); 


// Defining schema for Order
const orderSchema = new Schema({
    seller_email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 
            'Error: Please fill a valid email address!']
    },
    buyer_email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 
            'Error: Please fill a valid email address!']
    },

    product_list: [productSchema]
    
    
});


// Exporting the model
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

