import express from "express";
import { patchPost, deletePost, createPost, getPosts } from "../controllers/posts";
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', patchPost);
router.delete('/:id', deletePost);

export default router;
