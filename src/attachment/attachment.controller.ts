// attachment.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentDto } from './dto/create-attachment.dto';
import { Attachment } from './schemas/attachment.schema';



@Controller('api/messages/:messageId/attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post()
  async create(@Body() createAttachmentDto: AttachmentDto, @Req() Req): Promise<Attachment> {
    const {msgId } = Req.Param.messageId
    return this.attachmentService.create(createAttachmentDto, msgId);
  }

  @Get()
  async findAll(): Promise<Attachment[]> {
    return this.attachmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attachment> {
    return this.attachmentService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAttachmentDto: Partial<AttachmentDto>): Promise<any> {
    return this.attachmentService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Attachment> {
    return this.attachmentService.remove(id);
  }
}
