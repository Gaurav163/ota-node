
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const userSchema = new schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false },
        projects: [String]

    },
    { timestamps: true },
);

const User = mongoose.model("user", userSchema);
module.exports = User;

module.exports.hashPassword = async (password) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("hashing failed", error);
    }
};

module.exports.comparePasswords = (inputPassword, hashedPassword) => {
    try {

        return bcrypt.compareSync(inputPassword, hashedPassword);
    } catch (error) {

        throw new Error("comparing failed", error);

    }
};