import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CurrentUser } from 'src/utility/decorators/current-userdecorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { userInfo } from 'os';
import { ReviewEntity } from './entities/review.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guards';
import { AllowedGuard } from 'src/utility/guards/allowed.guard';
import { Roles } from 'src/utility/common/user-role.enum';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
@UseGuards(AuthenticationGuard,AllowedGuard([Roles.ADMIN]))
  @Post()
 // create(@Body() createReviewDto: CreateReviewDto) {
  async create(@Body() body: { productId: number; ratings: string; comment: string },@CurrentUser() currentUser:UserEntity) :Promise<ReviewEntity>{
    return this.reviewService.createReview(body,currentUser);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
