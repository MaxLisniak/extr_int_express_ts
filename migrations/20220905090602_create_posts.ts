import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", (table) => {
    table.increments();
    table.string("title", 64).notNullable().unique();
    table.string("content", 512).notNullable();
    table.dateTime("created_at").notNullable();
    table.integer("author_id").notNullable().unsigned();
    table.foreign("author_id")
      .references("id")
      .inTable("authors")
      .onDelete("CASCADE");
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}

