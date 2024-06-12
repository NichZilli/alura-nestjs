import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAndUpdateUserDto } from './dto/create-and-update-user.dto';

// @ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Create a User' })
    @ApiBody({ type: CreateAndUpdateUserDto, description: 'The body for create a User' })
    @ApiResponse({ status: 201, description: 'User Created', type: User })
    @Post()
    public async createUser(@Body() CreateAndUpdateUserDto: CreateAndUpdateUserDto): Promise<CreateAndUpdateUserDto> {
        return this.userService.createUser(CreateAndUpdateUserDto);
    }

    @ApiOperation({ summary: 'Get all Users' })
    @ApiResponse({ status: 200, description: 'OK', type: [User] })
    @Get()
    public async getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @ApiOperation({ summary: 'Get a User by ID' })
    @ApiResponse({ status: 200, description: 'OK', type: User })
    @Get(':id')
    public async getUser(@Param('id') id: string): Promise<CreateAndUpdateUserDto> {
        return this.userService.getUser(id);
    }

    @ApiOperation({ summary: 'Update a User by ID' })
    @ApiBody({ type: CreateAndUpdateUserDto, description: 'The body for update a User' })
    @ApiResponse({ status: 200, description: 'OK', type: User })
    @Put(':id')
    public async updateUser(@Param('id') id: string, @Body() updateUserDto: CreateAndUpdateUserDto): Promise<CreateAndUpdateUserDto> {
        return this.userService.updateUser(id, updateUserDto.userName, updateUserDto.email, updateUserDto.password,
                                           updateUserDto.fullName);
    }
}
