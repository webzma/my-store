/* eslint-disable no-undef */
const express = require("express");
const faker = require("faker");

const router = express.Router();

router.get("/", (req, res) => {
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      Image: faker.image.imageUrl(),
    });
  }

  res.json(users);
});

module.exports = router;
