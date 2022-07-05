import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './users.schema';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    const salt = genSaltSync();
    createUserDto.password = hashSync(createUserDto.password, salt);
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      username: loginUserDto.username,
    });
    return { authenticated: compareSync(loginUserDto.password, user.password) };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
