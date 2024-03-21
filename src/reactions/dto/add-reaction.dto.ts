import { IsString, IsNotEmpty, IsIn } from 'class-validator';

export class AddReactionDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['thumbsup', 'love', 'crying', 'surprised'])
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  user: string; 
}