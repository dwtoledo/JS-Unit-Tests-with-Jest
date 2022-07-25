import Item from "./Item";
import Product from "./Product";

describe("Item Class", () => {
  let product: Product;

  beforeEach(() => {
    product = new Product();
    product.setName("Mocked Product Test");
    product.setPrice(99);
  });

  it("should not create an item with negative quantity", () => {
    expect(() => {
      const item = new Item(-2, product);
    }).toThrowError();
  });

  it("should not create an item with zero quantity", () => {
    expect(() => {
      const item = new Item(0, product);
    }).toThrowError();
  });
});
