import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done',
}

@Schema({ timestamps: true })
export class Task extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ default: '' })
    description: string;

    @Prop({ type: Date })
    dueDate?: Date;

    @Prop({ enum: TaskStatus, default: TaskStatus.TODO })
    status: TaskStatus;

    @Prop({ type: Types.ObjectId, ref: 'Board', required: true })
    board: Types.ObjectId;
}

export const TaskSchema = SchemaFactory.createForClass(Task);