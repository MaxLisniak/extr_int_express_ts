import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("comments", (table) => {
    table.increments();
    table.string("text", 512).notNullable();
    table.dateTime("created_at").notNullable();
    table.integer("reply_to_comment").unsigned();
    table.integer("author_id").unsigned();
    table.integer("post_id").unsigned();
    table.foreign("post_id")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table.foreign("reply_to_comment")
      .references("id")
      .inTable("comments")
      .onDelete("CASCADE");
    table.foreign("author_id")
      .references("id")
      .inTable("authors")
      .onDelete("SET NULL");
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("comments");
}

