import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

// @ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Get a User by ID' })
    @ApiResponse({ status: 200, description: 'OK', type: User })
    @Get(':idUser')
    public async getUser(@Param('id') id: string): Promise<CreateUserDto> {
        return this.userService.getUser(id);
    }

    @ApiOperation({ summary: 'Create a User' })
    @ApiBody({ type: CreateUserDto, description: 'The body for create a User' })
    @ApiResponse({ status: 204, description: 'OK', type: User })
    @Post()
    public async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userService.createUser(createUserDto);
    }
}
