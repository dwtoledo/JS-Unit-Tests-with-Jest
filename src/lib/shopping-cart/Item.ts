import { PercentageDiscountCondition } from "./discounts/PercentageDiscountCondition";
import Product from "./Product";

export default class Item {
  private _quantity: number;
  private _product: Product;
  private _percentageDiscountCondition: PercentageDiscountCondition;

  constructor(quantity: number, product: Product) {
    if (quantity <= 0) {
      throw new Error("only positive quantities are allowed.");
    }

    this._product = product;
    this._quantity = quantity;
  }

  public getQuantity(): number {
    return this._quantity;
  }

  public getProduct(): Product {
    return this._product;
  }

  public updateQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error("only positive quantities are allowed.");
    }
    this._quantity = quantity;
  }

  public getPercentageDiscountCondition(): PercentageDiscountCondition {
    return this._percentageDiscountCondition;
  }

  public setPercentageDiscountCondition(percentageDiscountCondition: PercentageDiscountCondition): void {
    this._percentageDiscountCondition = percentageDiscountCondition;
  }
}
