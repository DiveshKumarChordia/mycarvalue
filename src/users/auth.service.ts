import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { promisify } from "util";
 //to remove the call back in scrypt
import { randomBytes,scrypt as _scrypt} from "crypto";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
   constructor(private usersService: UsersService){}

   // check if user already exists
   async signup(email:string,password:string){

       const users=await this.usersService.find(email);
       if(users.length){
        throw new BadRequestException("User alread exists");
        }
        // hash the user password
        /*
        salt generated
        salt + password -> hashed 
        hashed + salt -> stored
        */
       const salt = randomBytes(8).toString('hex');
       const hash = (await scrypt(password,salt,32)) as Buffer;
       const result = salt + '.' + hash.toString('hex');
       // create a new user
       const user = await this.usersService.create(email,result);
       // return 
       return user;
    }  

    async signin(email:string,password:string){
        const [user]=await this.usersService.find(email);
        if(!user)throw new NotFoundException("User Not Found");
        const [salt , storedHash]=user.password.split('.');

        const hash =(await scrypt(password,salt,32)) as Buffer;
        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException("Bad Password");
        }
        return user;
        
        // salt extract
        //hash  generation 
        // comparition
        // if true -> cookie 


    }
}