import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Listen for the connection event
        mongoose.connection.on('connected', () => console.log('Database Connected'));

        // Listen for the error event
        mongoose.connection.on('error', (err) => console.log('Database connection error:', err));

        // Connect to MongoDB using the URI from environment variable
        await mongoose.connect(`${process.env.MONGODB_URI}/fast-locum`);
    } catch (err) {
        console.error('Error connecting to database:', err);
    }
}

export default connectDB;
