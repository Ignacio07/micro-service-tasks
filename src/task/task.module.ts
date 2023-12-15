import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { CommentService } from 'src/comment/comment.service';
import { CommentModule } from 'src/comment/comment.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), CommentModule],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService],
})
export class TaskModule { }
