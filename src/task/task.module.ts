import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Task])],
    controllers: [TaskController],
    providers: [TaskService,],
    exports: [TaskService],
})
export class TaskModule { }
