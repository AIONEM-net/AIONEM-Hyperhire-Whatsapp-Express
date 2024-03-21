import { PartialType } from '@nestjs/mapped-types';
import { CreateChatRoomDto } from './create-chatroom.dto';

export class UpdateChatroomDto extends PartialType(CreateChatRoomDto) {}
