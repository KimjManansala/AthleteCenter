import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import bcrypt from 'bcrypt';

const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UserCreateInput): Promise<User | null> {
    const saltedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    return await this.databaseService.user.create({
      data: { ...createUserDto, password: saltedPassword },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneById(id: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.error('Error', error);
      throw new NotFoundException();
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.databaseService.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.error('Error', error);
      throw new NotFoundException();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
