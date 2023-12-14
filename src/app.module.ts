import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';
import { TaskModule } from './task/task.module';
import { TaskController } from './task/task.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), CommentModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
