/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto){
    const task = await this.taskService.create(createTaskDto);
    return task;
  }

  @Get()
  async findAll(){
    const tasks = await this.taskService.findAll();
    return tasks;
  }

  @Get(':id')
  async findOne(@Param('id') id: number){
    const task = await this.taskService.findOne(id);
    if(!task){
        throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto){
    const task = await this.taskService.update(updateTaskDto, id);
    return task;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.taskService.remove(id);
    return 'Task deleted';
  }

  @Get('tasks-email/:data')
  async findTaskByEmail(@Body() data: {email:string}){
    return await this.taskService.findTasksByEmail(data);
  }

  @Get('task-idTeam/:id_team')
    async findTaskByIdTeam(@Param('id_team') id_team: string){
      const id = parseInt(id_team,10);
      return await this.taskService.findTasksByIdTeam(id);
    }
}

