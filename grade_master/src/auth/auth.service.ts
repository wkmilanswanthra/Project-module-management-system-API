import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticateDto } from './dto/authenticate.dto';
import { IAuthenticate } from './interface/auth.interface';
import { sign } from 'jsonwebtoken';
import { Role } from './interface/auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async authenticateUser(
    authenticateDto: AuthenticateDto,
  ): Promise<IAuthenticate> {
    const user = await this.userRepository.findOneBy({
      username: authenticateDto.username,
    });

    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(
      authenticateDto.password,
      user.password,
    );
    if (!isMatch) throw new Error('Invalid password');
    delete user.password;
    delete user.updatedAt;
    delete user.createdAt;
    const payload = {
      id: user.id,
      user: user,
      role: user.role,
    };
    const token = sign(payload, 'secret');

    return {
      token,
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<IAuthenticate> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create(createUserDto);
      const newUser = await this.userRepository.save(user);
      delete newUser.password;
      delete newUser.updatedAt;
      delete newUser.createdAt;
      const payload = {
        id: newUser.id,
        user: newUser,
        role: newUser.role,
      };
      const token = sign(payload, 'secret');
      return { token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async updateUserRole(id: number, newRole: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = newRole;
    await this.userRepository.save(user);
  }

  async removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete({ id });
  }

  async updateUserById(
    id: number,
    updateUserDto: CreateUserDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async changeUserRole(id: number, newRole: Role): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.role = newRole;
    return this.userRepository.save(user);
  }

  async findAllByRole(role: Role): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
  }
}
