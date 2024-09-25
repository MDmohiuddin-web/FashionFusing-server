import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        // console.log('Connected to MongoDB');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`, {
          
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
