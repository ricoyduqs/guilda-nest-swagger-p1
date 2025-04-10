import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtension,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserBadRequestResponseInterface } from './interfaces/user-bad-request.interface';
import { UserNotFoundRequestResponseInterface } from './interfaces/user-not-found-request.interface';
import { SearchUserDto } from './dto/search-user.dto';

const variavel_da_uri = process.env.URI;
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiExtension('x-amazon-apigateway-integration', {
    type: 'HTTP_PROXY',
    httpMethod: 'POST',
    uri: `http://${variavel_da_uri}/user`,
    payloadFormatVersion: 1.0,
  })
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @ApiCreatedResponse({
    description: 'Returns changed annuity data.',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'Error creating user',
    type: UserBadRequestResponseInterface,
  })
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<CreateUserDto | UserBadRequestResponseInterface> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiExtension('x-amazon-apigateway-integration', {
    type: 'HTTP_PROXY',
    httpMethod: 'GET',
    uri: `http://${variavel_da_uri}/user`,
    payloadFormatVersion: 1.0,
  })
  @ApiOperation({
    summary: 'Return all users',
    description: 'Return all users',
  })
  @ApiOkResponse({
    description: 'Returns all users in the system.',
    type: CreateUserDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Return one of many users',
    description: 'Return one of many users',
  })
  @ApiOkResponse({
    description: 'Returns a specific user from the system.',
    type: SearchUserDto,
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
    type: UserNotFoundRequestResponseInterface,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
