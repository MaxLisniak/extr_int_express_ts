import express from "express";
import type { RequestHandler } from "express";
const router = express.Router();


/* GET home page. */
const index: RequestHandler = (req, res, next) => {
  res.render('index', { title: 'Express' });
}
router.get('/', index);

export default router;
