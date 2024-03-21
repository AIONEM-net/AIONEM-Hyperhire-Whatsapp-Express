import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';
import { ChatRoom } from './schemas/chatroom.schema';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@UseGuards(AuthGuard())
export class ChatRoomsService {
  constructor(@InjectModel(ChatRoom.name) private readonly chatRoomModel: Model<ChatRoom>) {}

  async create(createChatRoomDto: CreateChatRoomDto, creatorId: string): Promise<ChatRoom> {
    const createdRoom = new this.chatRoomModel({
      ...createChatRoomDto,
      creator: creatorId,
      participants: [creatorId],
    });
    return createdRoom.save();
  }

  async findAll(): Promise<ChatRoom[]> {
    return this.chatRoomModel.find().exec();
  }

  async findOne(roomId: string): Promise<ChatRoom> {
    return this.chatRoomModel.findById(roomId).exec();
  }

  async update(roomId: string, updateChatRoomDto: CreateChatRoomDto): Promise<ChatRoom> {
    return this.chatRoomModel.findByIdAndUpdate(roomId, updateChatRoomDto, { new: true }).exec();
  }

  async remove(roomId: string): Promise<any> {
    const result = await this.chatRoomModel.deleteOne({ _id: roomId }).exec();
    if(result){
      return "chatroom delete successfully"
    }
  }

  async joinChatRoom(roomId: string, userId: string): Promise<boolean> {
    const room = await this.chatRoomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }
    if (!room.participants.includes(userId)) {
      room.participants.push(userId);
      await room.save();
      return true;
    }
    return false;
  }

  async leaveChatRoom(roomId: string, userId: string): Promise<boolean> {
    const room = await this.chatRoomModel.findById(roomId).exec();
    if (!room) {
      throw new NotFoundException('Chat room not found');
    }
    const index = room.participants.indexOf(userId);
    if (index !== -1) {
      room.participants.splice(index, 1);
      await room.save();
      return true;
    }
    return false;
  }
}