import Model from "./BaseModel";
import path from 'path';
import * as yup from 'yup';


export const postSchema = yup.object().shape({
  title: yup.string().min(1).max(64),
  content: yup.string().min(1).max(512),
  created_at: yup.date(),
  author_id: yup.number().integer().positive(),
});


class Post extends Model {

  static get tableName() {
    return "posts"
  }

  static relationMappings = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, 'Author'),
      join: {
        from: "authors.id",
        to: "posts.author_id"
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'content', 'created_at', 'author_id'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 64 },
        content: { type: 'string', minLength: 1, maxLength: 512 },
        created_at: { type: 'string' },
        author_id: { type: 'integer' },

      }
    };
  }

}

// module.exports = Category;
export default Post;