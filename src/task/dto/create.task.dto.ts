import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";


export class CreateTaskDto{
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    initial_date: string;

    @IsString()
    @IsNotEmpty()
    final_date: string;

    @IsNumber()
    @IsNotEmpty()
    id_team: number;
}