import { Controller, Post, Body, Get, Patch, Param, Query, Delete, NotFoundException, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from '../decorators/current-user.decorators';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
   constructor(private usersService: UsersService,
      private authService: AuthService) { }

   // @Get('/whoami')
   //  whoami(@Session() session :any){
   //    return this.usersService.findOne(session.userId);
   // }
   @Get('/whoami')
   @UseGuards(AuthGuard)
   whoami(@CurrentUser() user: User) {
      return user;
   }
   @Post('/signup')
   async createUser(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.signup(body.email, body.password);
      session.userId = user.id;
      return user;
   }
   @Post('/signin')
   async signin(@Body() body: CreateUserDto, @Session() session: any) {
      const user = await this.authService.signin(body.email, body.password);
      session.userId = user.id;
      return user;
   }
   @Post('/signout')
   signout(@Session() session: any) {
      session.userId = null;
   }

   @Get('/:id')
   async findUser(@Param('id') id: string) {
      console.log("Handler is running");
      const user = await this.usersService.findOne(parseInt(id));
      if (!user) {
         throw new NotFoundException("Not Found here");
      }
      return user;
   }
   @Get()
   findAllUsers(@Query('email') email: string) {
      return this.usersService.find(email);

   }
   @Delete('/:id')
   removeUser(@Param('id') id: string) {
      return this.usersService.remove(parseInt(id));
   }
   @Patch('/:id')
   async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
      return await this.usersService.update(parseInt(id), body);
   }
}
