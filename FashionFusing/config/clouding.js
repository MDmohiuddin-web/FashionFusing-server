
import { v2 as cloudinary } from 'cloudinary';

const clouding =async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });
    console.log('clouding connected');
   
};

export default clouding;