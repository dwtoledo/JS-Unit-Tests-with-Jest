import Item from "../Item";
import Product from "../Product";
import { QuantityCondition } from "./QuantityCondition";

describe('Quantity Condition Class', () => {
  it('should not create quantity discount condition with takeQuantity less than 2', () => {
    expect(() => {
      const test = new QuantityCondition(1, 1);
    }).toThrowError();
  });

  it('should not create quantity discount condition with payQuantity less than 1', () => {
    expect(() => {
      const test = new QuantityCondition(3, 0);
    }).toThrowError();
  });

  it('should not create quantity discount condition with takeQuantity less than payQuantity', () => {
    expect(() => {
      const test = new QuantityCondition(3, 5);
    }).toThrowError();
  });

  it('should not create quantity discount condition with takeQuantity equal to payQuantity', () => {
    expect(() => {
      const test = new QuantityCondition(4, 4);
    }).toThrowError();
  });

  it('should return the correct total after take 3 pay 2 discount', () => {
    let mocked_product_1: Product;
    mocked_product_1 = new Product();
    mocked_product_1.setName("Mocked Product 1");
    mocked_product_1.setPrice(10);

    const mocked_item_1 = new Item(11, mocked_product_1);
    const quantityCondition = new QuantityCondition(3, 2);

    expect(quantityCondition.getTotalAfterDiscount(mocked_item_1)).toBe(80);
  });

  it('should return the correct total after take 4 pay 1 discount', () => {
    let mocked_product_1: Product;
    mocked_product_1 = new Product();
    mocked_product_1.setName("Mocked Product 1");
    mocked_product_1.setPrice(10);

    const mocked_item_1 = new Item(11, mocked_product_1);
    const quantityCondition = new QuantityCondition(4, 1);

    expect(quantityCondition.getTotalAfterDiscount(mocked_item_1)).toBe(50);
  });
});