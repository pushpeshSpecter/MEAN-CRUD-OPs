const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//create schema obj
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});
// Export Schema
const User = module.exports = mongoose.model('User', UserSchema);

//User.addUser() fn is exported from here
module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    })
}

module.exports.getUsersByUserName =
    function (email, callback) {
        const query = { email: email };
        User.findOne(query, callback);
    }

//User.comparePassword() fn exported from here
module.exports.comparePassword
    = function (candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) throw err;
            callback(null, isMatch);
        })
    }
module.exports.getUsersById = function (id, callback) {
    User.findById(id, callback);
}


