import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CustomConfigModule } from './auth/config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatRoomsModule } from './chatrooms/chatrooms.module';
import { MessageModule } from './message/message.module';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { AttachmentModule } from './attachment/attachment.module';
import { ReactionsModule } from './reactions/reactions.module';

@Module({
  imports: [
    PassportModule,
    CustomConfigModule,
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    ChatRoomsModule,
    MessageModule,
    AttachmentModule,
    ReactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
