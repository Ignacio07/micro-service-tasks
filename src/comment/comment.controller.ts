/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create.comment.dto';
import { UpdateCommentDto } from './dto/update.comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto){
    const comment = await this.commentService.create(createCommentDto);
    return comment;
  }

  @Get()
  async findAll(){
    const comments = await this.commentService.findAll();
    return comments;
  }

  @Get(':id')
  async findOne(@Param('id') id: number){
    const comment = await this.commentService.findOne(id);
    if(!comment){
        throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto){
    const comment = await this.commentService.update(updateCommentDto, id);
    return comment;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.commentService.remove(id);
    return 'Comment deleted';
  }
}
