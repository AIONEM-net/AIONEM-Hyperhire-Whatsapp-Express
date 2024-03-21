// attachment.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Attachment extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  size: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Message' }) 
  messageId: string; 

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
