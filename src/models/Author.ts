import Model from "./BaseModel";

class Author extends Model {

  static get tableName() {
    return "authors"
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 32 },
      }
    };
  }

}

export default Author;
