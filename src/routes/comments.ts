import express from "express";
const router = express.Router();
import { getComments, createComment, patchComment, deleteComment } from "../controllers/comments";

router.get('/', getComments);
router.post('/', createComment);
router.patch('/:id', patchComment);
router.delete('/:id', deleteComment);

export default router;
