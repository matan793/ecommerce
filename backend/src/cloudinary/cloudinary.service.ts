import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'davf0gjww',
      api_key: '854925135996687',
      api_secret: 'MJvOUyZIIRs8zYxfPZtcQSS6scQ',
    });
  }

 async uploadImageFromBuffer(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'ecommerce',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url || '');
        }
      );

      const bufferStream = Readable.from(file.buffer);
      bufferStream.pipe(uploadStream);
    });
  }
} 