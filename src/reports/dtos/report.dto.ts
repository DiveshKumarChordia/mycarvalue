import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";


export class ReportDto {
    @Expose()
    price:number;
    @Expose()
    make:string;
    @Expose()
    model:string;
    @Expose()
    year:number;
    @Expose()
    lng:number;
    @Expose()
    lat:number;
    @Expose()
    mileage:number;
    @Expose()
    id:number;
    @Expose()
    approved:boolean;
    @Transform(({obj})=>obj.user.id)
    @Expose()
    userId:number;
}