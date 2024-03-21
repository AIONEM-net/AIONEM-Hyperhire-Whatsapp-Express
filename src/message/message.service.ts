import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message} from './schemas/message.schema';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    if (!createMessageDto.content) {
      throw new BadRequestException('Message content is required.');
    }
    const createdMessage = new this.messageModel(createMessageDto);
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const updatedMessage = await this.messageModel.findByIdAndUpdate(id, updateMessageDto, { new: true }).exec();
    if (!updatedMessage) {
      throw new NotFoundException('Message not found');
    }
    return updatedMessage;
  }

  async remove(id: string): Promise<Message> {
    const deletedMessage = await this.messageModel.findByIdAndDelete(id).exec();
    if (!deletedMessage) {
      throw new NotFoundException('Message not found');
    }
    return deletedMessage;
  }
}