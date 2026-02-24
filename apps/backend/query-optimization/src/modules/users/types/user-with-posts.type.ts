export type PostView = {
  id: number;
  title: string;
  createdAt: Date | null;
};

export type UserWithPostsView = {
  id: number;
  name: string;
  email: string;
  posts: PostView[];
};
