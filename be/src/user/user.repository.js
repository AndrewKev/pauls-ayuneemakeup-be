const prisma = require('../db');

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

  return {username: user.username, email: user.email};
}

module.exports = {
  findUserByUsernameEmail,
  insertNewUser
};