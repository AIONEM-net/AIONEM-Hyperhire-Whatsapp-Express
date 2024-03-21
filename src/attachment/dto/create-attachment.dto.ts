import { IsString } from 'class-validator';

export class AttachmentDto {
  @IsString()
   url: string;

  @IsString()
   type: string;


}