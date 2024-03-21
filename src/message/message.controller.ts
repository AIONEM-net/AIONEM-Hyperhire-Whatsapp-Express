import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schemas/message.schema';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('api/:chatRoomId/messages')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Req() req,
    @Body() createMessageDto: CreateMessageDto,
    @Param('chatRoomId') chatRoomId: string,
  ) {
    try {
      if (!createMessageDto.content) {
        throw new BadRequestException('Message content is required.');
      }
      const createdMessage = await this.messageService.create({
        ...createMessageDto,
        senderId:req.user._id,
        chatRoomId: chatRoomId,
      });
      
      return { message: 'Message created successfully', data: createdMessage };
    
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { error: error.message };
      }
      console.error('Failed to create message:', error);
      return { error: 'Internal server error' };
    }
  }
  @Get()
  async findAll(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    const message = await this.messageService.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  @Patch(':msgId')
  async update(@Param('msgId') id: string, @Body() updateMessageDto: UpdateMessageDto): Promise<Message> {
    const updatedMessage = await this.messageService.update(id, updateMessageDto);
    if (!updatedMessage) {
      throw new NotFoundException('Message not found');
    }
    return updatedMessage;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Message> {
    const deletedMessage = await this.messageService.remove(id);
    if (!deletedMessage) {
      throw new NotFoundException('Message not found');
    }
    return deletedMessage;
  }
}