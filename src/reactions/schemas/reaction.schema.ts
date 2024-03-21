import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Reaction extends Document {
  @Prop({ required: true })
  type: string; // e.g., 'like', 'love', 'thumbs-up'

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  user: string; 
  
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Message', required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);