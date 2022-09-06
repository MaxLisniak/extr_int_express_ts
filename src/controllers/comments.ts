import { RequestHandler } from "express";
import { getAllCommentsForThePostTransaction, createCommentTransaction, patchCommentTransaction, deleteCommentTransaction, getCommentsTransaction } from "../transactions/comments";
import { commentSchema } from "../models/Comment";
import logger from "../logger";


export const getComments: RequestHandler = async (req, res, next) => {
  const { postId, page } = req.query;
  if (!postId) {
    const comments = await getCommentsTransaction();
    return res.send(comments);
  }
  const comments = await getAllCommentsForThePostTransaction(Number(postId), Number(page))
  return res.send(comments);
}

export const createComment: RequestHandler = async (req, res, next) => {
  const obj = { ...req.body, created_at: new Date().toISOString().slice(0, 19).replace('T', ' ') };
  commentSchema.validate(obj).catch(function (err) {
    logger.error(err.errors); // => ['Deve ser maior que 18']
  });
  commentSchema
    .isValid(obj)
    .then(async (valid) => {
      if (valid) {
        const comment = await createCommentTransaction(obj);
        return res.send(comment);
      } else return res.sendStatus(400)
    });
}

export const patchComment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const obj = req.body;
  commentSchema.validate(obj).catch(function (err) {
    logger.error(err.errors); // => ['Deve ser maior que 18']
  });
  commentSchema
    .isValid(obj)
    .then(async (valid) => {
      if (valid) {
        const comment = await patchCommentTransaction(Number(id), obj);
        return res.send(comment);
      } else return res.sendStatus(400)
    });
}

export const deleteComment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteCommentTransaction(Number(id));
  if (result) {
    res.sendStatus(200)
  } else {
    res.sendStatus(400);
  }
}