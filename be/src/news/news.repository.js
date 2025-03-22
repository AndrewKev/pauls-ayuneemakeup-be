const prisma = require('../db');

const findNews = async () => {
  const news = await prisma.news.findMany();

  return news;
};

const findNewsById = async (id) => {
  const newsItem = await prisma.news.findUnique(
    {
      where: {
        id
      }
    }
  );

  return newsItem;
}

const insertNews = async (newsData) => {
  const newsItem = await prisma.news.create({
    data: {
      title: newsData.title,
      description: newsData.description,
      image: newsData.image,
    },
  });

  return newsItem;
};

const updateNews = async (id, data) => {
  return await prisma.news.update({
    where: { id },
    data,
  });
}

const deleteNews = async (id) => {
  await prisma.news.delete({ where: { id } });
}


module.exports = {
  findNews,
  findNewsById,
  insertNews,
  updateNews,
  deleteNews
};