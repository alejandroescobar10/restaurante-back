const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://alejoesmo:edwardjunior@cluster0.ovtdg3f.mongodb.net/restaurante");
        console.log(">>> DB is connected");
    } catch (error) {
        console.log(error)
    }
}
module.exports = {connectDB};