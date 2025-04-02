const express = require("express");

const router = express.Router();

const { register, login, regenerateAccessToken } = require('./auth.service');

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
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    return res.send({ message: 'Success login', data: {accessToken} });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if(!refreshToken) {
      return res.status(401).send({error: {message: 'Please login again'}});
    }
    
    const {accessToken} = await regenerateAccessToken(refreshToken);

    // Set new refresh token if needed (optional)
    // res.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'strict',
    //   maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    // });

    return res.send({ message: 'Success refresh access token', data: {accessToken} });
  } catch (error) {
    const msg = error.message || "Please login again";
    return res.status(403).send({ error: {message: msg} });
  }
});

module.exports = router;