import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { PostView, UserWithPostsView } from './types/user-with-posts.type';

type JoinedUserRow = {
  id: number;
  name: string;
  email: string;
  posts: unknown;
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUsers(limit: number): Promise<Array<{ id: number; name: string; email: string }>> {
    return this.prisma.user.findMany({
      take: limit,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findPostsByUserId(userId: number): Promise<PostView[]> {
    const posts = await this.prisma.post.findMany({
      where: { userId },
      orderBy: { id: 'asc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
    }));
  }

  async findUsersWithPostsUsingRelationLoading(
    limit: number,
  ): Promise<UserWithPostsView[]> {
    const users = await this.prisma.user.findMany({
      take: limit,
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        email: true,
        posts: {
          orderBy: { id: 'asc' },
          select: {
            id: true,
            title: true,
            createdAt: true,
          },
        },
      },
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      posts: user.posts.map((post) => ({
        id: post.id,
        title: post.title,
        createdAt: post.createdAt,
      })),
    }));
  }

  async findUsersWithPostsUsingLeftJoin(limit: number): Promise<UserWithPostsView[]> {
    const rows = await this.prisma.$queryRaw<JoinedUserRow[]>(Prisma.sql`
      SELECT
        u.id,
        u.name,
        u.email,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', p.id,
              'title', p.title,
              'createdAt', p."createdAt"
            )
            ORDER BY p.id
          ) FILTER (WHERE p.id IS NOT NULL),
          '[]'::json
        ) AS posts
      FROM "User" u
      LEFT JOIN "Post" p ON p."userId" = u.id
      GROUP BY u.id, u.name, u.email
      ORDER BY u.id
      LIMIT ${limit};
    `);

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      posts: this.parseJoinedPosts(row.posts),
    }));
  }

  private parseJoinedPosts(rawPosts: unknown): PostView[] {
    if (!rawPosts) {
      return [];
    }

    const parsed = Array.isArray(rawPosts)
      ? rawPosts
      : (JSON.parse(String(rawPosts)) as unknown[]);

    return parsed.map((post) => {
      const typedPost = post as { id: unknown; title: unknown; createdAt: unknown };
      return {
        id: Number(typedPost.id),
        title: String(typedPost.title),
        createdAt: typedPost.createdAt
          ? new Date(String(typedPost.createdAt))
          : null,
      };
    });
  }
}
