import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from '../schemas/board.schema';
import { AuthModule } from '../auth/auth.module';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
        AuthModule,
    ],
    controllers: [BoardsController],
    providers: [BoardsService],
    exports: [BoardsService],
})
export class BoardsModule { }