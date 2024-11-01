import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'GetAll')
  async getAll() {
    const users = await this.userService.getAllUsers();
    return { users };
  }

  @GrpcMethod('UserService', 'GetById')
  async getById(data: { id: number }) {
    return this.userService.getUserById(data.id);
  }

  @GrpcMethod('UserService', 'Create')
  async create(data: { email: string; name: string; username: string; password: string }) {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'Update')
  async update(data: { id: number; email?: string; name?: string; username?: string; password?: string }) {
    return this.userService.updateUser(data.id, data);
  }

  @GrpcMethod('UserService', 'Delete')
  async delete(data: { id: number }) {
    return this.userService.deleteUser(data.id);
  }
}
