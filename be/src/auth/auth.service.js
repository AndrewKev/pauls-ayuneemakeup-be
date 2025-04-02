const { z } = require('zod');

const bcrypt = require('bcrypt');

const { generateAccessToken, generateRefreshToken, verifyRefreshToken, decodeJwt } = require('../utils/jwt');
const { updateUserToken } = require('../user/user.repository');

const {
  findUserById,
  findUserByUsername,
  findUserByUsernameEmail,
  findUserByRefreshToken,
  insertNewUser } = require('../user/user.repository');

const login = async (reqBody) => {
  try {
    const user = await findUserByUsername(reqBody.username);
    if (!user) {
      const err = new Error('Invalid email or password');
      throw { message: err.message };
    }

    const isMatch = await bcrypt.compare(reqBody.password, user.password);
    if (!isMatch) {
      const err = new Error('Invalid email or password');
      throw { message: err.message };
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await updateUserToken(user.id, refreshToken);

    return { accessToken, refreshToken }
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const register = async (data) => {
  const schema = z.object({
    username: z.string().min(3, "Username min 3 characters").max(30, "Username max 30 characters"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters")
  });

  const result = schema.safeParse(data);

  if (!result.success) {
    throw result.error.issues;
  }

  const checkUser = await findUserByUsernameEmail(data.username, data.email);

  if (checkUser) {
    const err = new Error('User exists');
    throw { message: err.message };
  }

  const hashedPassword = await bcrypt.hash(data.password, 3);
  data.password = hashedPassword;

  return insertNewUser(data);
}

const regenerateAccessToken = async (refreshToken) => {
  let decoded;
  try {
    const userExist = await findUserByRefreshToken(refreshToken);

    decoded = decodeJwt(userExist.refreshToken);
    const verified = verifyRefreshToken(refreshToken);

    const accessToken = generateAccessToken(verified.userId);

    return { accessToken };
  } catch (error) {
    if(decoded && decoded.userId) {
      await updateUserToken(decoded.userId, null);
    }
    const err = new Error('Invalid refresh token, please login again');
    throw { message: err.message };
  }
}

module.exports = { login, register, regenerateAccessToken }