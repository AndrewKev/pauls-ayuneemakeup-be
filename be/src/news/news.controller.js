const express = require("express");

const router = express.Router();

const { 
  getAllNews,
  getNewsById,
  addNewNews,
  editNewsById,
  deleteNewsById } = require('./news.service');

router.get("/", async (req, res) => {
  const news = await getAllNews();

  res.send({
    message: "Success get all news",
    data: news
  });
});

router.get("/:id", async (req, res) => {
  try {
    const newsId = parseInt(req.params.id);

    const newsItem = await getNewsById(newsId);

    res.send({
      message: "Success get news by id",
      data: newsItem
    });
  } catch (error) {
    const statusCode = error.code || 400;
    res.status(statusCode).send({ error: error.message || "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newNewsData = req.body;

    const newsItem = await addNewNews(newNewsData);

    res.send({
      message: "Insert news success",
      data: newsItem,
    });
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong" });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    await getNewsById(parseInt(req.params.id));

    const newsItem = await editNewsById(parseInt(req.params.id), req.body);

    res.send({
      message: "News updated",
      newsItem
    });
  } catch (error) {
    const statusCode = error.code || 400;
    res.status(statusCode).send({ error: error.message || "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await getNewsById(parseInt(req.params.id));

    const newsId = parseInt(req.params.id);

    const newsItem = await deleteNewsById(newsId);

    res.send({
      message: "News deleted",
      deleted: newsItem
    });
  } catch (error) {
    res.status(400).send({ error: error.message || "Something went wrong" });
  }
});


module.exports = router;