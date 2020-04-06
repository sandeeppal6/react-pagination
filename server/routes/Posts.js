const express = require("express");
const Posts = require("../modals/Posts");

const router = express.Router();

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
