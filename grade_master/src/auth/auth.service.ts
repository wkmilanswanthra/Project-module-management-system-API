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
import { Project } from 'src/project/entities/project.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async authenticateUser(authenticateDto: AuthenticateDto): Promise<any> {
    const res: any = {};

    const user = await this.userRepository.findOneBy({
      username: authenticateDto.username,
    });

    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(
      authenticateDto.password,
      user.password,
    );
    if (!isMatch) throw new Error('Invalid password');

    if (user.role === Role.STUDENT) {
      const project = await this.projectRepository.find({
        where: [
          { member1: user.id },
          { member2: user.id },
          { member3: user.id },
          { member4: user.id },
        ],
        relations: [
          'supervisor',
          'coSupervisor',
          'member1',
          'member2',
          'member3',
          'member4',
        ],
      });
      project.forEach((proj: any) => {
        delete proj.supervisor.password;
        delete proj.coSupervisor.password;
        delete proj.member1.password;
        delete proj.member2.password;
        delete proj.member3.password;
        delete proj.member4.password;
      });
      console.log(project);
      if (project.length > 0) {
        res.project = project;
      }
    }
    delete user.password;
    delete user.updatedAt;
    delete user.createdAt;
    const payload = {
      id: user.id,
      user: user,
      role: user.role,
    };
    const token = sign(payload, 'secret');
    res.token = token;
    return res;
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

  async addUser(createUserDto: CreateUserDto): Promise<void> {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    if (!users) {
      throw new NotFoundException('No user found');
    }
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async findAllFaculty(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: [
        { role: Role.PROJECT_COORDINATOR },
        { role: Role.MEMBER },
        { role: Role.SUPERVISOR },
        { role: Role.CO_SUPERVISOR },
        { role: Role.EXAMINER },
        { role: Role.STAFF },
      ],
    });
    if (!users) {
      throw new NotFoundException('No user found');
    }
    users.forEach((user) => {
      delete user.password;
    });
    return users;
  }

  async findAllStudents(): Promise<User[]> {
    const users = await this.userRepository.find({
      where: [{ role: Role.STUDENT }, { role: Role.PROJECT_LEADER }],
    });
    if (!users) {
      throw new NotFoundException('No user found');
    }
    users.forEach((user) => {
      delete user.password;
    });
    return users;
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
