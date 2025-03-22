const { 
  findNews,
  findNewsById,
  insertNews,
  updateNews,
  deleteNews
} = require('./news.repository');

const getAllNews = async () => {
  const news = await findNews();

  return news;
};

const getNewsById = async (id) => {
  const newsItem =  await findNewsById(id);

  if (!newsItem) {
    const err = new Error("News not found");
    err.code = 404;
    throw err;
  }

  return newsItem;
}

const addNewNews = async (data) => {
  const newsItem = await insertNews(data);

  return newsItem;
}

const editNewsById = async (id, data) => {
  return await updateNews(id, data);
}

const deleteNewsById = async (id) => {
  const newsItem = getNewsById(id);

  await deleteNews(id);

  return newsItem;
}

module.exports = {
  getAllNews,
  getNewsById,
  addNewNews,
  editNewsById,
  deleteNewsById
}