// attachment.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AttachmentDto } from './dto/create-attachment.dto';
import { Attachment } from './schemas/attachment.schema';

@Injectable()
export class AttachmentService {
  constructor(@InjectModel(Attachment.name) private attachmentModel: Model<Attachment>) {}

  async create(createAttachmentDto: AttachmentDto, messageId: string): Promise<Attachment> {
    try {
      const createdAttachment = new this.attachmentModel({ ...createAttachmentDto, messageId });
      const savedAttachment = await createdAttachment.save();
      return savedAttachment;
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errorMessage = Object.values(error.errors).map((err: any) => err.message).join(', ');
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Could not create attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Attachment[]> {
    try {
      return this.attachmentModel.find().exec();
    } catch (error) {
      throw new HttpException('Could not fetch attachments', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Attachment> {
    try {
      return this.attachmentModel.findById(id).exec();
    } catch (error) {
      throw new HttpException('Attachment not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateAttachmentDto: Partial<AttachmentDto>): Promise<Attachment> {
    try {
      return this.attachmentModel.findByIdAndUpdate(id, updateAttachmentDto, { new: true }).exec();
    } catch (error) {
      throw new HttpException('Could not update attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<Attachment> {
    try {
      return this.attachmentModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new HttpException('Could not delete attachment', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
