import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  private readonly includeRelations = {
    category: true,
    tags: { include: { tag: true } },
  };

  async create(dto: CreatePostDto) {
    const { tagIds, ...data } = dto;
    return this.prisma.post.create({
      data: {
        ...data,
        tags: tagIds?.length
          ? { create: tagIds.map((tagId) => ({ tagId })) }
          : undefined,
      },
      include: this.includeRelations,
    });
  }

  async findAll(params?: { published?: boolean }) {
    const where = params?.published !== undefined
      ? { published: params.published }
      : {};
    return this.prisma.post.findMany({
      where,
      include: this.includeRelations,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: this.includeRelations,
    });
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
      include: this.includeRelations,
    });
    if (!post) throw new NotFoundException(`Post "${slug}" not found`);
    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.findOne(id);
    const { tagIds, ...data } = dto;
    return this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        tags: tagIds
          ? {
              deleteMany: {},
              create: tagIds.map((tagId) => ({ tagId })),
            }
          : undefined,
      },
      include: this.includeRelations,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.post.delete({ where: { id } });
  }
}
