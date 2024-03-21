import { Body, Controller, HttpException, HttpStatus, Post , Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/logIn.dto';
import { PassportModule } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        try {
            const token = await this.authService.signUp(signUpDto);
            return  token ;
        } catch (error) {
            throw new HttpException(`Failed to sign up ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Get('/login')
        login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
         return this.authService.login(loginDto);
  }
}

