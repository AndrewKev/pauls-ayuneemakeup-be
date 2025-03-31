const prisma = require('../db');

const findUserById = async (id) => {
  const user = await prisma.user.findUnique(
    {
      where: {
        id
      }
    }
  );

  return user;
}

const findUserByUsername = async (username) => {
  const user = await prisma.user.findUnique(
    {
      where: {
        username
      }
    }
  );

  return user;
}

const findUserByUsernameEmail = async (username, email) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: username },
        { email: email },
      ],
    },
  });

  return user;
}

const insertNewUser = async (data) => {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password
    },
  });

  return { username: user.username, email: user.email };
}

const updateUserToken = async (id, refreshToken) => {
  return await prisma.user.update({
    where: { id: id },
    data: { refreshToken },
  });
}

module.exports = {
  findUserById,
  findUserByUsername,
  findUserByUsernameEmail,
  insertNewUser,
  updateUserToken
};