import { Entity,Column,PrimaryGeneratedColumn} from "typeorm";
import { AfterInsert,AfterRemove ,AfterUpdate } from "typeorm";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    @Column()
    password:string;
    @AfterInsert()
    logInsert(){
        console.log("Inserted user : id: ",this.id,
        " email: ",this.email,
        " password: ",this.password);
    }
    @AfterRemove()
    logRemove(){
        console.log("Deleted User:",
        " email: ",this.email ," password: ",this.password);
    }
    @AfterUpdate()
    logUpdate(){
        console.log(" User  email: ",this.email , " password: ",this.password );
    }
    
}   
