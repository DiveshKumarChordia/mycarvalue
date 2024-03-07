import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@gmail.com', password: 'adfsa' } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'adf' } as User]);
      },
      // remove : (id:number) => {
      //   return Promise.resolve({id,email:"asdff@df.com",password:'ddd'}as User);
      // },
      // update : (id:number,body:Partial<User>) => {
      //   return Promise.resolve({id,email:"sadf@d.com",password:"sdaf"} as User);
      // }
    };
    fakeAuthService = {
      // signup :() =>{}

      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });
  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });
  it('signin and update session object and return user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin({ email: "asdf@adsf.com", password: "adsf" }, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
  // it('removed ',async ()=>{
  //   const user = await controller.removeUser('1');
  //   expect(user.id).toEqual(1);

  // })

  // it('update',async () =>{
  //   const body = {email:"asdfdf@adsfd.com",password:"adsf"};
  //   const user =await controller.updateUser('1',body);
  //   expect(user.email).not.toEqual(body.email);

  // })
});
