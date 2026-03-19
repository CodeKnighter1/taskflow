import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const exists = await this.userModel.findOne({ email: dto.email });
        if (exists) throw new BadRequestException('Bu email allaqachon ro‘yxatdan o‘tgan');

        const hashed = await bcrypt.hash(dto.password, 10);
        const user = await this.userModel.create({ email: dto.email, password: hashed });

        return this.login({ email: dto.email, password: dto.password });
    }

    async login(dto: LoginDto) {
        const user = await this.userModel.findOne({ email: dto.email });
        if (!user || !(await bcrypt.compare(dto.password, user.password))) {
            throw new UnauthorizedException('Email yoki parol noto‘g‘ri');
        }

        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: { id: user._id.toString(), email: user.email },
        };
    }
}