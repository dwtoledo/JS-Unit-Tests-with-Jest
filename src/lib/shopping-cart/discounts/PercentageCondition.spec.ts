import Item from "../Item";
import Product from "../Product";
import { PercentageCondition } from "./PercentageCondition";

describe("Percentage Condition Class", () => {
  it("should throw an error when creates a percentage discount condition with quantity less than 2", () => {
    expect(() => {
      const test = new PercentageCondition(90, 1);
    }).toThrowError();
  });

  it("should throw an error when creates a percentage discount condition with percentage higher than 100", () => {
    expect(() => {
      const test = new PercentageCondition(101, 2);
    }).toThrowError();
  });

  it("should throw an error when creates a percentage discount condition with percentage equal to zero", () => {
    expect(() => {
      const test = new PercentageCondition(0, 2);
    }).toThrowError();
  });

  it("should throw an error when creates a percentage discount condition with negative percentage", () => {
    expect(() => {
      const test = new PercentageCondition(-30, 2);
    }).toThrowError();
  });

  it('should return the correct total after discount', () => {
    let mocked_product_1: Product;
    mocked_product_1 = new Product();
    mocked_product_1.setName("Mocked Product 1");
    mocked_product_1.setPrice(10);

    const mocked_item_1 = new Item(2, mocked_product_1);
    const percentageCondition = new PercentageCondition(15, 2);

    expect(percentageCondition.getTotalAfterDiscount(mocked_item_1)).toBe(17);
  });
});
