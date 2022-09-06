import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("authors", (table) => {
    table.increments();
    table.string("username", 32).notNullable();
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("authors");
}

