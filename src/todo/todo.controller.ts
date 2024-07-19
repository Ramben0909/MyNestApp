import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/auth.guard'
import { UserEmail } from '../common/decorators/user-email.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'Create a new todo', summary: 'Create a new todo with details'})
  @Post()
  create(@Body() createTodoDto: CreateTodoDto ,@UserEmail()
  userEmail: string) {
    return this.todoService.create(createTodoDto,userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'Get all todos', summary: 'Get all todos'})
  @Get()
  async findAll(@UserEmail()
  userEmail: string){
      return this.todoService.findAll(userEmail);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'Get a specicific todo', summary: 'Get a todo by id'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'Update a todo', summary: 'Update a todo by id'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: 'Delete a todo', summary: 'Delete a todo by id'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
