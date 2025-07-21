import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.signup(dto);
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    if (!dto.email || !dto.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authService.signin(dto);
  }
}
