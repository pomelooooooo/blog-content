import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  excerpt: string | null;

  @ApiPropertyOptional()
  coverImage: string | null;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiPropertyOptional()
  categoryId: number | null;

  @ApiPropertyOptional()
  category?: { id: number; name: string; slug: string } | null;

  @ApiPropertyOptional()
  tags?: { tag: { id: number; name: string; slug: string } }[];
}
