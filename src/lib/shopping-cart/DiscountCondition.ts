export class DiscountCondition {
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
}