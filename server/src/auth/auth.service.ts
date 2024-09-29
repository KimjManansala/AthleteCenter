import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    const match = await compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: Prisma.UserCreateInput): Promise<any> {
    try {
      const user = await this.userService.create(createUserDto);
      Logger.log('New User created and logging in');
      return this.signIn(user.email, user.password);
    } catch (error) {
      Logger.error(error);
    }
  }
}
