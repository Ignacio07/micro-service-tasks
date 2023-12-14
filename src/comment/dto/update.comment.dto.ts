import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCommentDto{
    
    @IsString()
    @IsNotEmpty()
    comment: string;
}