import { DiscountCondition } from "./DiscountCondition";

describe("Discount Condition Class", () => {
  it("should throw an error when creates a discount condition with quantity less than 2", () => {
    expect(() => {
      const discountCondition = new DiscountCondition(90, 1);
    }).toThrowError();
  });

  it("should throw an error when creates a discount condition with percentage higher than 100", () => {
    expect(() => {
      const discountCondition = new DiscountCondition(101, 2);
    }).toThrowError();
  });

  it("should throw an error when creates a discount condition with percentage equal to zero", () => {
    expect(() => {
      const discountCondition = new DiscountCondition(0, 2);
    }).toThrowError();
  });

  it("should throw an error when creates a discount condition with negative percentage", () => {
    expect(() => {
      const discountCondition = new DiscountCondition(-30, 2);
    }).toThrowError();
  });
});
