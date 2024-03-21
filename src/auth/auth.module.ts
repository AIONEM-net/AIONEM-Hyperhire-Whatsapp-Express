import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomConfigModule } from './config/config.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';  
import { User, UserSchema } from './schemas/user.schema';  
import { JwtStrategy } from './jwt_strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
    JwtModule.registerAsync({
      imports: [CustomConfigModule],  
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService], 
    }),
  ],
  controllers: [AuthController], 
  providers: [AuthService, JwtStrategy], 
  exports: [JwtModule, JwtStrategy], 
}) 
export class AuthModule {}
