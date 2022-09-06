import Comment from "../models/Comment";

const COMMENTS_PER_PAGE = 3;

export const getAllCommentsForThePostTransaction = async (postId: number, page?: number) => {
  if (!page) { page = 1; }
  const comments = await Comment.query()
    .where("post_id", postId)
    .limit(COMMENTS_PER_PAGE)
    .offset((page - 1) * COMMENTS_PER_PAGE)
  return comments;
}

export const getCommentsTransaction = async () => {
  const comments = await Comment.query();
  return comments;
}

export const createCommentTransaction = async (obj: any) => {
  const comment = await Comment.query()
    .insertAndFetch(obj);
  return comment
}

export const patchCommentTransaction = async (id: number, obj: any) => {
  const comment = await Comment.query()
    .patchAndFetchById(id, obj);
  return comment;
}

export const deleteCommentTransaction = async (id: number) => {
  const res = await Comment.query()
    .deleteById(id);
  return res;
}
