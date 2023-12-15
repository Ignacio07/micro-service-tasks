import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTaskDto{
    
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

    @IsEmail()
    @IsNotEmpty()
    email: string;
}