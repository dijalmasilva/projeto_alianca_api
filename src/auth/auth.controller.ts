import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthRequestCodeDto } from 'src/auth/dto/auth-request-code.dto';
import { AuthSignOutDto } from 'src/auth/dto/auth-sign-out.dto';
import { Public } from 'src/auth/jwt.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/code')
  async requestCode(@Body() auth: AuthRequestCodeDto) {
    return this.authService.requestCode(auth.phoneNumber);
  }

  @Get('/signOut')
  async signOut(@Body() auth: AuthSignOutDto) {
    await this.authService.signOut(auth.phoneNumber);
  }
}
