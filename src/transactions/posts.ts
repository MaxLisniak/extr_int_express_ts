import Post from "../models/Post";

export const getPostsByTitleTransaction = async (title: string) => {
  const post = await Post.query()
    .where('title', 'like', `%${title}%`);
  return post[0];
}

export const getPostsTransaction = async () => {
  const posts = await Post.query();
  return posts;
}

export const createPostTransaction = async (obj: any) => {
  const post = await Post.query()
    .insertAndFetch(obj);
  return post
}

export const patchPostTransaction = async (id: number, obj: any) => {
  const post = await Post.query()
    .patchAndFetchById(id, obj);
  return post;
}

export const deletePostTransaction = async (id: number) => {
  const res = await Post.query()
    .deleteById(id);
  return res;
}