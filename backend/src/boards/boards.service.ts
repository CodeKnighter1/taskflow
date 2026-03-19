import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Board } from '../schemas/board.schema';

@Injectable()
export class BoardsService {
    constructor(@InjectModel(Board.name) private boardModel: Model<Board>) { }

    async getOrCreateBoard(userId: string) {
        let board = await this.boardModel.findOne({ owner: userId });
        if (!board) {
            board = await this.boardModel.create({ owner: userId, title: 'My Board' });
        }
        return board;
    }
}