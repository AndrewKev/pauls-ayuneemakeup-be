const express = require("express");

const router = express.Router();

const { register, login } = require('./auth.service');

router.post("/register", async (req, res) => {
  try {
    const reg = await register(req.body)

    return res.status(201).send({ message: 'Success register', data: reg });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { accessToken, refreshToken } = await login(req.body);

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      maxAge: 60 * 1000, // 1 min
    });

    return res.send({ message: 'Success login', data: {accessToken} });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

module.exports = router;