import Model from "./BaseModel";
import path from 'path';
import * as yup from 'yup';

export const commentSchema = yup.object().shape({
  text: yup.string().min(1).max(512),
  created_at: yup.date(),
  author_id: yup.number().integer().positive(),
  post_id: yup.number().integer().positive(),
});

class Comment extends Model {

  static get tableName() {
    return "comments"
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'Author'),
      join: {
        from: "authors.id",
        to: "comments.author_id"
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text', 'created_at', 'author_id', 'post_id'],
      properties: {
        id: { type: 'integer' },
        text: { type: 'string', minLength: 1, maxLength: 512 },
        created_at: { type: 'string' },
        author_id: { type: 'integer' },
        post_id: { type: 'integer' },
        reply_to_id: { type: 'integer' },
      }
    };
  }

}

export default Comment;