const knex = require("../../db/connection");

exports.addCommentsByArticleID = (article_id, username, body) => {
  return knex("comments")
    .insert({ author: username, article_id: article_id, body: body })
    .returning([
      "article_id",
      "author",
      "body",
      "comment_id",
      "votes",
      "created_at",
    ]);
};

exports.selectCommentsByArticleID = (article_id, sort_by, order) => {
  return knex
    .select("comments.*")
    .from("comments")
    .orderBy(sort_by || "created_at", order || "desc")
    .where("article_id", "=", article_id);
};

exports.updateVotesByCommentID = (comment_id, inc_votes) => {
  return knex("comments")
    .where({ "comments.comment_id": comment_id })
    .increment("votes", inc_votes || 0)
    .returning("*")
    .then((comment) => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      } else {
        return comment;
      }
    });
};

exports.removeCommentbyID = (comment_id) => {
  return knex("comments")
    .where({ comment_id })
    .del()
    .then((delCount) => {
      if (delCount === 0) {
        return Promise.reject({ status: 404, msg: "comment not found" });
      } else {
        return { status: 204 };
      }
    });
};
