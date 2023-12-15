import { CommentModule } from './comment/comment.module';
import { TaskModule } from './task/task.module';
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
