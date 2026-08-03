import { v2 as cloudinary } from 'cloudinary';
import config from '../config/index.js';
import AppError from '../errors/AppError.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

/**
 * Uploads a file buffer to Cloudinary via stream
 * @param {Buffer} fileBuffer - The file buffer from multer memory storage
 * @param {string} folder - The destination folder in Cloudinary
 * @returns {Promise<Object>} - The Cloudinary upload result
 */
const uploadToCloudinary = (fileBuffer, folder = 'techflect') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          reject(new AppError(500, 'Failed to upload file to Cloudinary'));
        } else {
          resolve(result);
        }
      }
    );

    // Write the buffer to the stream and end it
    uploadStream.end(fileBuffer);
  });
};

export const FileUploader = {
  uploadToCloudinary,
};
