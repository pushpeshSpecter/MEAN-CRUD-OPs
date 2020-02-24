var mongoose = require('mongoose');
//schema object
const Schema = mongoose.Schema;
let Product = new Schema({
    id: { type: Number },
    productId: { type: Number },
    productName: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    customerName: { type: String },
    address: { type: String },
    mobileNumber: { type: Number }
});
//exporting Schema
module.exports = mongoose.model('Product', Product);




