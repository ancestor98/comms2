import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/utility/decorators/current-userdecorator';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guards';
import { AllowedGuard } from 'src/utility/guards/allowed.guard';
import { Roles } from 'src/utility/common/user-role.enum';
import { CategoryEntity } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
@UseGuards(AuthenticationGuard,AllowedGuard([Roles.ADMIN                            ]))
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser()currentuser:UserEntity):Promise<CategoryEntity> {
    return this.categoriesService.create(createCategoryDto,currentuser)
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
