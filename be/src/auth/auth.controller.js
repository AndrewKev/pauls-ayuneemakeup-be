const express = require("express");

const router = express.Router();

const { register } = require('./auth.service');

router.post("/register", async (req, res) => {
  try {
    const reg = await register(req.body)

    return res.status(201).send({ message: 'Success register', data: reg });
  } catch (error) {
    return res.status(400).send({ error });
  }
});

module.exports = router;