import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserModule } from './user.module';

interface UserService {
  getAll(data: {}): Observable<{ users: any[] }>;
  getById(data: { id: number }): Observable<any>;
  create(data: { 
    email: string; 
    name: string; 
    username: string; 
    password: string 
  }): Observable<any>;
  update(data: { 
    id: number;
    email?: string; 
    name?: string; 
    username?: string; 
    password?: string 
  }): Observable<any>;
  delete(data: { id: number }): Observable<any>;
}

@Controller('users')
export class UserController {
  private userService: UserService;

  constructor(
    @Inject('USER_SERVICE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get()
  getAllUsers() {
    return this.userService.getAll({});
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getById({ id });
  }

  @Post()
  createUser(@Body() body: {
    email: string; 
    name: string; 
    username: string; 
    password: string
  }) {
    return this.userService.create(body);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: number, 
    @Body() body: {
      email?: string; 
      name?: string; 
      username?: string; 
      password?: string
    }
  ) {
    return this.userService.update({ id, ...body });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete({ id });
  }
}