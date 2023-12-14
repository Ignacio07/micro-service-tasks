import {IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateCommentDto{
    
    @IsString()
    @IsNotEmpty()
    authorEmail: string;

    @IsString()
    @IsNotEmpty()
    comment: string;

    @IsNumber()
    id_task: number;
}