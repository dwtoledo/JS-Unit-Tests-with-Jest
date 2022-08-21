export default class Product {
  public readonly NAME_MIN_LENGTH = 10;

  private _price: number;
  private _name: string;

  public getPrice(): number {
    return this._price;
  }

  public setPrice(price: number): void {
    if (price <= 0) {
      throw new Error("only positive prices are allowed.");
    }
    this._price = price;
  }

  public setName(name: string): void {
    if (name.length < this.NAME_MIN_LENGTH) {
      throw new Error(`min of ${this.NAME_MIN_LENGTH} chars is required.`);
    }
    this._name = name;
  }
}
