const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB refused to connect:", error);
    }
};

module.exports = connectDB;