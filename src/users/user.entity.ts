import { Report } from "../reports/report.entity";
import { Entity,Column,PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { AfterInsert,AfterRemove ,AfterUpdate } from "typeorm";
@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    @Column()
    password:string;
    @Column({default:false})
    admin:boolean;
    @OneToMany(()=>Report, (report)=>report.user)
    reports:Report[];


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
