import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from './dto/create-user.dto';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { UpdateUser } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/user/create')
  createUser(@Body() dto: CreateUser) {
    return this.userService.createUser(dto);
  }

  @Get('/users/')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Put('/user/edit/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUser,
  ) {
    return this.userService.updateUser(id, userData);
  }

  @Delete('/user/delete/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
