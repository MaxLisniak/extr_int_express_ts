import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import type { NextFunction, RequestHandler, Request, Response } from "express";

dotenv.config();

import indexRouter from './routes/index';
import commentsRouter from './routes/comments';
import postsRouter from "./routes/posts";

const app = express();
import morgan from "morgan";
app.use(morgan('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/comments', commentsRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
const error404Handler: RequestHandler = (req, res, next) => {
  next(createError(404));
}
app.use(error404Handler);

// error handler
export type ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => any;
const errorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.sendStatus(err.status || 500);
  // res.render('error');
}
app.use(errorHandler);

// module.exports = app;
export default app;
