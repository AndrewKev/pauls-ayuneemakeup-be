const { z, ZodError } = require('zod');

const bcrypt = require('bcrypt');

const { findUserByUsernameEmail, insertNewUser } = require('../user/user.repository');

const login = () => {

}

const register =  async (data) => {
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
    throw {message: err.message};
  }

  const hashedPassword = await bcrypt.hash(data.password, 3);
  data.password = hashedPassword;
  
  return insertNewUser(data);
}

module.exports = { login, register }