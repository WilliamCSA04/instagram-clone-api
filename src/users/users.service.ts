import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './users.schema';
import { scryptSync, randomBytes, timingSafeEqual } from 'crypto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const salt = randomBytes(16).toString('hex');
    createUserDto.password = `${salt}:${scryptSync(
      createUserDto.password,
      salt,
      64,
    ).toString('hex')}`;
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    // LOGIN CODE
    // const [salt, key] = user.password.split(':');
    // const hashedBuffer = scryptSync(user.password, salt, 64);
    // const buffer = Buffer.from(key, 'hex');
    // const match = timingSafeEqual(hashedBuffer, buffer)
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
