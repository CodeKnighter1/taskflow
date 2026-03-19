import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { BoardsService } from '../boards/boards.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<Task>,
        private boardsService: BoardsService,
    ) { }

    async create(dto: CreateTaskDto, userId: string) {
        const board = await this.boardsService.getOrCreateBoard(userId);
        const task = await this.taskModel.create({ ...dto, board: board._id });
        return task;
    }

    async findAll(userId: string) {
        const board = await this.boardsService.getOrCreateBoard(userId);
        return this.taskModel.find({ board: board._id }).sort({ createdAt: -1 });
    }

    async update(id: string, dto: UpdateTaskDto) {
        const task = await this.taskModel.findByIdAndUpdate(id, dto, { new: true });
        if (!task) throw new NotFoundException('Task topilmadi');
        return task;
    }

    async remove(id: string) {
        const task = await this.taskModel.findByIdAndDelete(id);
        if (!task) throw new NotFoundException('Task topilmadi');
        return { message: 'Task o‘chirildi' };
    }
}