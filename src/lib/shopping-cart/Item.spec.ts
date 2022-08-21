import { PercentageCondition } from "./discounts/PercentageCondition";
import { QuantityCondition } from "./discounts/QuantityCondition";
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

  it("should not update an item quantity with negative value", () => {
    expect(() => {
      const item = new Item(2, product);
      item.updateQuantity(-2);
    }).toThrowError();
  });

  it("should not update an item quantity with zero", () => {
    expect(() => {
      const item = new Item(3, product);
      item.updateQuantity(0);
    }).toThrowError();
  });

  it("should add one discount condition", () => {
    const item = new Item(3, product);
    item.setDiscountCondition(new QuantityCondition(4, 2));

    expect(item.getDiscountConditions().length).toBe(1);
  });

  it("should add more than one discount conditions", () => {
    const item = new Item(3, product);
    item.setDiscountCondition(new QuantityCondition(4, 2));
    item.setDiscountCondition(new PercentageCondition(75, 3));

    expect(item.getDiscountConditions().length).toBe(2);
  });
});
