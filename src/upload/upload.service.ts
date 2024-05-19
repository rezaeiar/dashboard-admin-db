import { DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StatusResult } from "src/shared/status-result/status-result";
import { extname } from "path";
import { IUpload } from "./interface/upload.interface";

@Injectable()
export class UploadService {
    constructor(private readonly configService:ConfigService){}

    private readonly endpoint = this.configService.get('LIARA_ENDPOINT')
    private readonly bucket = this.configService.get('LIARA_BUCKET_NAME')
    private readonly client = new S3Client({
      region: "default",
      endpoint:  'https://' + this.endpoint,
      credentials: {
        accessKeyId: this.configService.get('LIARA_ACCESS_KEY'),
        secretAccessKey: this.configService.get('LIARA_SECRET_KEY')
      },
    });

    async uploadFile(file:Express.Multer.File):Promise<IUpload>{
      const randomName = Date.now().toString() + extname(file.originalname)
      const params = {
        Body: file.buffer,
        Bucket: this.bucket,
        Key: randomName,
      };
      try {
        await this.client.send(new PutObjectCommand(params));
      } catch (error) {
        throw error;
      }

      const url = `https://${this.bucket}.${this.endpoint}/${randomName}`

      return {
        url , 
        key : params.Key ,
      }
    }

    async findAll():Promise<IUpload[]>{
      const params = {
        Bucket: this.bucket,
      };

      const data = await this.client.send(new ListObjectsV2Command(params));
      const files = data.Contents.map((file) =>{
        return {
          url : `https://${this.bucket}.${this.endpoint}/${file.Key}`,
          key : file.Key,
        }
      });

      return files;
    }

    async removeFile(key:string):Promise<StatusResult>{
      const params = {
        Bucket: this.bucket,
        Key: key
      };
      
      try {
        await this.client.send(new DeleteObjectCommand(params));
      } catch (error) {
        return {
          success : false ,
          message : error.message ,
        }
      }

      return {
        message : 'File removed successfully' , 
        success : false ,
      }
    }

}