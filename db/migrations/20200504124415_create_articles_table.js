exports.up = function (knex) {
  //console.log("Creating articles table...");

  return knex.schema.createTable("articles", (articlesTable) => {
    articlesTable.increments("article_id").primary();
    articlesTable.string("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable.bigInteger("votes").defaultTo(0);
    articlesTable.text("topic").references("topics.slug").notNullable();
    articlesTable.string("author").references("users.username").notNullable();
    articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  //console.log("Removing articles table...");

  return knex.schema.dropTable("articles");
};
