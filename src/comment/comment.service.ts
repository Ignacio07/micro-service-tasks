/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UpdateCommentDto } from './dto/update.comment.dto';
import { CreateCommentDto } from './dto/create.comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
    ){}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentRepository.create(createCommentDto);
        return await this.commentRepository.save(comment);
    }
    
    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find();
    }
    
    async findOne(id: number): Promise<Comment | undefined> {
        return this.commentRepository.findOneBy({id});
    }
    
    async update(updateCommentDto: UpdateCommentDto, id: number): Promise<Comment | undefined> {
        const comment = await this.commentRepository.findOneBy({id});
        if (!comment) {
          throw new BadRequestException('Comment not found');
        }
        Object.assign(comment, updateCommentDto);
        return await this.commentRepository.save(comment);
    }
    
    async remove(id: number): Promise<void> {
        const comment = await this.commentRepository.findOneBy({id});
        if (!comment) {
          throw new BadRequestException('Comment not found');
        }
        await this.commentRepository.remove(comment);
    }

    async findCommentsByIdTask(id_task: number): Promise<{commentsIds: number[], commentsAuthors: string[], commentsComments: string[]}> {
        const comments = await this.commentRepository.find({where: {id_task}})
        const commentsIds = comments.map((comment) => comment.id);
        const commentsAuthors = comments.map((comment) => comment.authorEmail);
        const commentsComments = comments.map((comment) => comment.comment);
        return {commentsIds, commentsAuthors, commentsComments};
    }

    async deleteCommentsByIdTask(id_task: number): Promise<string>{
        try {
            const commentsToDelete = await this.commentRepository.find({ where : {id_task} });
            await Promise.all(commentsToDelete.map(comment => this.commentRepository.delete(comment)));
          } catch (error) {
            throw new Error(`Error al eliminar miembros del equipo: ${error}`);
          }
        return 'Comentarios Eliminados';
    }
}
