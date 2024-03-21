// reaction.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reaction } from './schemas/reaction.schema';
import { AddReactionDto } from './dto/add-reaction.dto';

@Injectable()
export class ReactionService {
  messageModel: any;
  constructor(@InjectModel(Reaction.name) private readonly reactionModel: Model<Reaction>) {}

  async addReaction(addReactionDto: AddReactionDto): Promise<Reaction> {
    const messageExists = await this.messageModel.exists({ _id: addReactionDto.message });
    if (!messageExists) {
      throw new NotFoundException('Message not found');
    }
    

    const reaction = new this.reactionModel(addReactionDto);
    return reaction.save();
  }

  async getReactionsForMessage(messageId: string): Promise<Reaction[]> {
    const reactions = await this.reactionModel.find({ message: messageId }).exec();

    if (!reactions || reactions.length === 0) {
      throw new NotFoundException('Reactions not found');
    }

    return reactions;
  }
}
