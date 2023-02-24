import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthSignInDto } from 'src/auth/dto/auth-sign-in.dto';
import { AuthRequestCodeDto } from 'src/auth/dto/auth-request-code.dto';
import { AuthSignOutDto } from 'src/auth/dto/auth-sign-out.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/code')
  async requestCode(@Body() auth: AuthRequestCodeDto) {
    return this.authService.requestCode(auth.phoneNumber);
  }

  @Post('/signIn')
  async signIn(@Body() auth: AuthSignInDto) {
    return this.authService.signIn(auth.phoneNumber, auth.code);
  }

  @Get('/signOut')
  async signOut(@Body() auth: AuthSignOutDto) {
    await this.authService.signOut(auth.phoneNumber);
  }
}
