const express = require("express");
const Posts = require("../modals/Posts");

const router = express.Router();

router.get("/getPosts/:startIndex/:limit", (req, res) => {
  const { startIndex, limit } = req.params;
  let totalRecords = 0;
  Posts.countDocuments({}).exec((err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    }
    totalRecords = result;
  });

  Posts.find(
    {},
    { __v: 0, createdAt: 0, updateAt: 0 },
    { skip: parseInt(startIndex) - 1, limit: parseInt(limit) }
  ).exec((err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      return res.status(200).send({ data: { totalRecords, posts: result } });
    }
  });
});

router.post("/post", (req, res) => {
  const { title } = req.body;
  Posts.create({ title }, (err) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ message: "inserted successfully" });
    }
  });
});

module.exports = router;
