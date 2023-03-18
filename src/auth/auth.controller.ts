import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { AuthService } from './auth.service';

import { Public } from '/decorators/jwt.decorator';
import { LocalAuthGuard } from '/guards/local-auth.guard';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Solicita um código para autenticar na API' })
  @Public()
  @Post('/code')
  async requestCode(@Body() auth: { phoneNumber: string }) {
    return this.authService.requestCode(auth.phoneNumber);
  }

  @ApiOperation({ summary: 'Login' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @Public()
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Get('/logout')
  async signOut(@Request() req: any) {
    const user = req.user;
    await this.authService.signOut(user.username);
    return {};
  }

  @Post('/profile')
  getProfile(@Request() req: any, @Body() include?: Prisma.PersonInclude) {
    const { id } = req.user;
    return this.authService.getProfile(id, include);
  }
}
