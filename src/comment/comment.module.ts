import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentController],
    providers: [CommentService,],
    exports: [CommentService],
})
export class CommentModule { }
