const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Qoşuldu: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB Xətası:", error);
        process.exit(1);
    }
};

module.exports = connectDb;