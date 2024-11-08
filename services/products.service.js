/* eslint-disable no-undef */
const faker = require("faker");
const boom = require("@hapi/boom");

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 50;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        Image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(this.products);
      }, 5000);
    });
  }

  async findOne(id) {
    const product = this.products.find((elem) => elem.id === id);

    if (!product) {
      throw boom.notFound("product no found");
    }

    if (product.isBlock) {
      throw boom.conflict("product is block");
    }

    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex((elem) => elem.id === id);

    if (index === -1) {
      throw boom.notFound("product no found");
    }

    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };

    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((elem) => elem.id === id);

    if (index === -1) {
      throw new Error("product no found");
    }

    this.products.splice(index, 1);
    return { id };
  }
}
module.exports = ProductsService;
