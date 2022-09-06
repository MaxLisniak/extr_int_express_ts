import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("authors").del();

    // Inserts seed entries
    await knex("authors").insert([
        { id: 1, username: "Alex" },
        { id: 2, username: "Joe" },
        { id: 3, username: "Ben" }
    ]);
};
