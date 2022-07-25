import Product from "./Product";

describe("Product Class", () => {
  let product: Product;

  beforeEach(() => {
    product = new Product();
  });

  it("Throw an error if trying to set a product price with negative value", () => {
    expect(() => {
      product.setPrice(-2);
    }).toThrowError();
  });

  it("Throw an error if trying to set a product price as zero", () => {
    expect(() => {
      product.setPrice(0);
    }).toThrowError();
  });

  it("Throw an error if trying to set a product name with less chars then the minimun defined", () => {
    expect(() => {
      product.setName("test");
    }).toThrowError();
  });

  it("Set product name without error when name has more chars then the min. defined", () => {
    expect(() => {
      product.setName("Name of Product Test");
    }).not.toThrowError();
  });

  it("Set product name without error when name has the exacly chars length of the min. defined", () => {
    expect(() => {
      product.setName("1234567890");
    }).not.toThrowError();
  });
});
