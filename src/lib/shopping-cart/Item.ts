export default class Item {
  private quantity: number;

  constructor(quantity: number) {
    if (quantity <= 0) {
      throw new Error("only positive quantities are allowed.");
    }
    this.quantity = quantity;
  }

  public getQuantity(): number {
    return this.quantity;
  }
}
