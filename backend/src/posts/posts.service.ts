import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: { author: { select: { email: true, name: true } } },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: { author: { select: { email: true, name: true } } },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId)
      throw new ForbiddenException('You can only edit your own posts');
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number, userId: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    if (post.authorId !== userId)
      throw new ForbiddenException('You can only delete your own posts');
    return this.prisma.post.delete({ where: { id } });
  }

  async findByUser(userId: number) {
    return this.prisma.post.findMany({
      where: { authorId: userId },
      include: { author: { select: { email: true, name: true } } },
    });
  }
}
