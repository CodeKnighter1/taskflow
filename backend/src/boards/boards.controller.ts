import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BoardsService } from './boards.service';
import { User } from 'src/common/decorators/user.decorator';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
    constructor(private boardsService: BoardsService) { }

    @Get('my')
    async getMyBoard(@User() user: { userId: string; email: string }) {
        const board = await this.boardsService.getOrCreateBoard(user.userId);
        return board;
    }
}