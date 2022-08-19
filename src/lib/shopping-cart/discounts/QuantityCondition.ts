import Item from "../Item";
import { IDiscount } from "./IDiscount";

export class QuantityCondition implements IDiscount {
  private _takeQuantity: number;
  private _payQuantity: number;

  constructor(takeQuantity: number, payQuantity: number) {
    if (takeQuantity < 2) {
      throw new Error('invalid quantity to take, it should be at least 2.')
    }

    if (payQuantity < 1) {
      throw new Error('invalid quantity to pay, it should be at least 1.')
    }

    if (takeQuantity <= payQuantity) {
      throw new Error('the quantity to take should be higher than quantity to pay.')
    }

    this._takeQuantity = takeQuantity;
    this._payQuantity = payQuantity;
  }

  public getTakeQuantity(): number {
    return this._takeQuantity;
  }

  public getPayQuantity(): number {
    return this._payQuantity;
  }

  private calculateDiscountRate(): number {
    return this._payQuantity / this._takeQuantity;
  }

  public getTotalAfterDiscount(item: Item): number {
    if (item.getQuantity() < this._takeQuantity) {
      return item.getQuantity() * item.getProduct().getPrice();
    }

    const multiple = Math.trunc(item.getQuantity() / this._takeQuantity); //
    const remainder = item.getQuantity() % this._takeQuantity;
    const discount = this.calculateDiscountRate();
    let multipleTotal = 0;
    let remainderTotal = 0;

    multipleTotal = (multiple * this._takeQuantity * item.getProduct().getPrice());
    remainderTotal = remainder * item.getProduct().getPrice();

    return (multipleTotal * discount) + remainderTotal;
  }
}
