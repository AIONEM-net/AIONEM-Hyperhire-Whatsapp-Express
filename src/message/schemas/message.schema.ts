import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  senderId: string; 

  @Prop({ type: SchemaTypes.ObjectId, ref: 'ChatRoom', required: true })
  chatRoomId: string; 

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Attachment' }] })
  attachments: string[]; 

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
