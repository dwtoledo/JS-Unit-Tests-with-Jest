import { PercentageCondition } from "./discounts/PercentageCondition";
import Product from "./Product";

export default class Item {
  private _quantity: number;
  private _product: Product;
  private _percentageCondition: PercentageCondition;

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

  public getPercentageCondition(): PercentageCondition {
    return this._percentageCondition;
  }

  public setPercentageCondition(percentageCondition: PercentageCondition): void {
    this._percentageCondition = percentageCondition;
  }
}
