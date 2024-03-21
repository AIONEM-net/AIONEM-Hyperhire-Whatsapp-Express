import { Module } from '@nestjs/common';
import { ReactionService } from './reactions.service';
import { ReactionController } from './reactions.controller';
import { ReactionSchema } from './schemas/reaction.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Reaction', schema:ReactionSchema}])],
  controllers: [ReactionController],
  providers: [ReactionService],
})
export class ReactionsModule {}
