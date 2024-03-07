import { Test } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("Auth Service",()=>{

    let service: AuthService;
    let fakeUsersService : Partial<UsersService>;
    beforeEach( async ()=>{
            const users:User[]=[];
         fakeUsersService = {
            find: (email:string) => {
                const FilteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(FilteredUsers);
            },
            create: (email:string,password:string) => {
                const user = {id:users.length,email,password} as User;
                users.push(user);
                return Promise.resolve(user);
            }
    
        };
        const module = await Test.createTestingModule({
            providers:[AuthService,
            {
                provide:UsersService,
                useValue: fakeUsersService
            }],
        }).compile();
         service = module.get(AuthService);
    });
    
    
    it('can create an instance of auth service',async () =>{
    
        expect(service).toBeDefined();
    })

    it('create an instance , with salted password ',async ()=>{
        
        const user = await service.signup("asdfsdaf@gmail.com","asdf");

        expect(user.password).not.toEqual('asdf');
        const [salt,hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
        //toBeDefined- > they must exist . 

    }) ;
    it('throws an error if user signs up with email that is in use', async () => {
        await service.signup('asdf@asdf.com', 'asdf');
        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
          BadRequestException,
        );
      });
     
      it('throws if signin is called with an unused email', async () => {
        await expect(
          service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
        ).rejects.toThrow(NotFoundException);
      });
     
      it('throws if an invalid password is provided', async () => {
        await service.signup('laskdjf@alskdfj.com', 'password');
        await expect(
          service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
        ).rejects.toThrow(BadRequestException);
      });
    

    it('if the user password is correct',async () =>{
        await service.signup('asdsf@gmail.com','masword');
        const user =await service.signin('asdsf@gmail.com','masword');
        expect(user).toBeDefined();
    });

});

