import { IsBoolean, IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";


export class CreateReportDto{
    @IsNumber()
    @Min(0)
    @Max(10000000)
    price:number;

    @IsString()
    make:string;
    @IsString()
    model:string;

    @IsNumber()
    @Min(1900)
    @Max(2030)
    year:number;

    @IsLongitude()
    lng:number;

    @IsLatitude()
    lat:number;

    @IsNumber()
    @Min(0)
    @Max(10000)
    mileage:number;
}