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
}
