const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

// ✅ Fix: use the schema object name, not 'User'
userSchema.plugin(passportLocalMongoose);

// ✅ Fix: pass the schema, not the string "userSchema"
module.exports = mongoose.model("User", userSchema);