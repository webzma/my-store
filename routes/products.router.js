/* eslint-disable no-undef */
const express = require("express");

const ProductsService = require("../services/products.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require("../schemas/products.schema");

const router = express.Router();
const service = new ProductsService();

router.get("/filter", async (req, res) => {
  res.send("Yo soy filter");
});

router.get("/", async (req, res) => {
  const products = await service.find();

  res.json(products);
});

router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);

  res.json({
    message: "created",
    newProduct,
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    res.status("404").json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product);
});

module.exports = router;
