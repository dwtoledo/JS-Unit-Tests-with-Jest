import { IDiscount } from "./discounts/IDiscount";
import Product from "./Product";

export default class Item {
  private _quantity: number;
  private _product: Product;
  private _discountConditions: Array<IDiscount>;

  constructor(quantity: number, product: Product) {
    if (quantity <= 0) {
      throw new Error("only positive quantities are allowed.");
    }

    this._product = product;
    this._quantity = quantity;
    this._discountConditions = new Array<IDiscount>();
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

  public getDiscountConditions(): Array<IDiscount> {
    return this._discountConditions;
  }

  public setDiscountCondition(discountCondition: IDiscount): void {
    this._discountConditions.push(discountCondition);
  }
}
