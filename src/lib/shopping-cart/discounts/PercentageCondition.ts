import Item from "../Item";
import { IDiscount } from "./IDiscount";

export class PercentageCondition implements IDiscount {
  private _percentage: number;
  private _minimumQuantity: number;

  constructor(percentage: number, minimumQuantity: number) {
    if (minimumQuantity < 2) {
      throw new Error("minimum quantity must be at least 2.")
    }

    if (percentage > 100 || percentage <= 0) {
      throw new Error("invalid discount percentage.")
    }

    this._percentage = percentage;
    this._minimumQuantity = minimumQuantity;
  }

  public getPercentage(): number {
    return this._percentage;
  }

  public getMinimumQuantity(): number {
    return this._minimumQuantity;
  }

  public getTotalAfterDiscount(item: Item): number {
    let discountPercentage = 0;

    if (item.getQuantity() >= this._minimumQuantity) {
      discountPercentage = this._percentage;
    }

    const total = item.getQuantity() * item.getProduct().getPrice();
    const discount = total * (discountPercentage / 100);

    return (total - discount);
  }
}