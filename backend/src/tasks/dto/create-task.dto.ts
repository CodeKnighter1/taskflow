import { IsString, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { TaskStatus } from 'src/schemas/task.schema';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsDateString()
    dueDate?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}