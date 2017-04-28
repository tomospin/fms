var mongoose = require('mongoose');
 
var ProductSchema = new mongoose.Schema({
 
    name: {type: String, required: true},
    description: {type: String, default: ''},
    image: {type: String, default: ''},
    company: {type: String, required: true},
    quantity: {type: Number, required: true},
    price: {type: Number, required: true}

 
}, {
    timestamps: true
});
 
module.exports = mongoose.model('Product', ProductSchema);