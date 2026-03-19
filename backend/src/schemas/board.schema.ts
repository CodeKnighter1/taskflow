import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop({ required: true, default: 'My Board' })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId;
}

export const BoardSchema = SchemaFactory.createForClass(Board);