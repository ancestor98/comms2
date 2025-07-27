import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guards';
import { AllowedGuard } from 'src/utility/guards/allowed.guard';
import { Roles } from 'src/utility/common/user-role.enum';
import { CurrentUser } from 'src/utility/decorators/current-userdecorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
@UseGuards(AuthenticationGuard,AllowedGuard([Roles.ADMIN]))
  @Post()
  create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:UserEntity) {
    return this.productService.create(createProductDto,currentUser);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
