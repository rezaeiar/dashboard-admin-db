import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common"
import { fromBuffer } from "file-type"
import { Express } from "express"

@Injectable()
export class FileTypeValidationPipe implements PipeTransform {
  async transform(value: Express.Multer.File) {
    const { mimetype } = value
    const MIME_TYPES = ["image/jpeg", "image/png", "image/webp" ,"image/jpg"]

    if (!MIME_TYPES.includes(mimetype)) {
      throw new BadRequestException(
        "The image should be either jpeg, png, jpg , or webp."
      )
    }

    return value
  }
}