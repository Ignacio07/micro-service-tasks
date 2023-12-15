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
}