import { RequestHandler } from "express";
import { postSchema } from "../models/Post";
import { createPostTransaction, deletePostTransaction, getPostsByTitleTransaction, getPostsTransaction, patchPostTransaction } from "../transactions/posts";
import logger from "../logger";

export const getPosts: RequestHandler = async (req, res, next) => {
  const { title } = req.query as { title: string };
  if (!title) {
    const posts = await getPostsTransaction();
    return res.send(posts);
  }
  const post = await getPostsByTitleTransaction(title);
  res.send(post);
}

export const createPost: RequestHandler = async (req, res, next) => {
  const obj = { ...req.body, created_at: new Date().toISOString().slice(0, 19).replace('T', ' ') };
  postSchema.validate(obj).catch(function (err) {
    logger.error(err.errors); // => ['Deve ser maior que 18']
  });
  postSchema
    .isValid(obj)
    .then(async (valid) => {
      if (valid) {
        const comment = await createPostTransaction(obj);
        return res.send(comment);
      } else return res.sendStatus(400)
    });
}

export const patchPost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const obj = req.body;
  postSchema.validate(obj).catch(function (err) {
    logger.error(err.errors); // => ['Deve ser maior que 18']
  });
  postSchema
    .isValid(obj)
    .then(async (valid) => {
      if (valid) {
        const comment = await patchPostTransaction(Number(id), obj);
        return res.send(comment);
      } else return res.sendStatus(400)
    });
}

export const deletePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await deletePostTransaction(Number(id));
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(400);
  }
}