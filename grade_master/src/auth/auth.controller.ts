import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './helpers/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { RoleGuard } from './role/role.guard';
import { Role } from './interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Res() res: any, @Body() CreateUserDto: CreateUserDto) {
    try {
      const response = await this.authService.createUser(CreateUserDto);
      return res.status(201).json(response);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  @Post('login')
  async login(@Res() res: any, @Body() CreateUserDto: CreateUserDto) {
    try {
      const response = await this.authService.authenticateUser(CreateUserDto);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll(@Req() req) {
    return this.authService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.authService.updateUserById(+id, updateUserDto);
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id/change-role')
  async changeRole(@Param('id') id: string, @Body('role') newRole: Role) {
    return this.authService.changeUserRole(+id, newRole);
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('users/:role')
  async findAllByRole(@Param('role') role: Role) {
    return this.authService.findAllByRole(role);
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.authService.removeUser(+id);
  }
}
