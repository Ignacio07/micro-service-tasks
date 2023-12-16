/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
        private readonly commentService: CommentService,
    ){}

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create(createTaskDto);
        return await this.taskRepository.save(task);
    }
    
    async findAll(): Promise<Task[]> {
        return this.taskRepository.find();
    }
    
    async findOne(id: number): Promise<Task | undefined> {
        return this.taskRepository.findOneBy({id});
    }
    
    async update(updateTaskDto: UpdateTaskDto, id: number): Promise<Task | undefined> {
        const task = await this.taskRepository.findOneBy({id});
        if (!task) {
          throw new BadRequestException('Task not found');
        }
        Object.assign(task, updateTaskDto);
        return await this.taskRepository.save(task);
    }
    
    async remove(id: number): Promise<void> {
        const task = await this.taskRepository.findOneBy({id});
        if (!task) {
          throw new BadRequestException('Task not found');
        }
        await this.taskRepository.remove(task);
    }

    async findTasksByEmail(data: {email: string}): Promise<Task[]> {
        const email = data.email;
        const tasks = await this.taskRepository.find({where : {email}});
        return tasks;
    } 

    async findTasksByIdTeam(id_team: number): Promise<Task[]> {
        const tasks = await this.taskRepository.find({where: {id_team}})
        return tasks;
    }

    async deleteTaskAndComments(id: number): Promise<string>{
        try{    
            const existingTask = await this.taskRepository.findOne({ where: { id } });
            console.log(id, existingTask);
            if (!existingTask) {
            throw new Error('La tarea no existe');
            }
            await this.commentService.deleteCommentsByIdTask(id);
            await this.taskRepository.remove(existingTask);
            return 'Tarea Eliminada'
        } catch (error) {
            throw new Error('Error al eliminar tarea');
        }
    }

}
