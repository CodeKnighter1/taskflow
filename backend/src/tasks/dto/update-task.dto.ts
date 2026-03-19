import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TaskStatus } from 'src/schemas/task.schema';

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

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