import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateMessageDto {
  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  readonly attachments?: string[];
}
