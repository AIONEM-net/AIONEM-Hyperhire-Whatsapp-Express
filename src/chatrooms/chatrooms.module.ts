import { Module } from '@nestjs/common';
import { ChatRoomSchema } from './schemas/chatroom.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoomsController } from './chatrooms.controller';
import { ChatRoomsService } from './chatrooms.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'ChatRoom', schema: ChatRoomSchema }]),
  ],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService],
})
export class ChatRoomsModule {}
