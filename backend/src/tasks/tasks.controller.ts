import { Controller, Post, Get, Patch, Delete, Body, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: CreateTaskDto, @User() user: { userId: string }) {
        return this.tasksService.create(dto, user.userId);
    }

    @Get()
    findAll(@User() user: { userId: string }) {
        return this.tasksService.findAll(user.userId);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        return this.tasksService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }
}