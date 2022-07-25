export default class Product {
  public readonly NAME_MIN_LENGTH = 10;

  private price: number;
  private name: string;

  public getPrice(): number {
    return this.price;
  }

  public setPrice(price: number): void {
    if (price <= 0) {
      throw new Error("only positive prices are allowed.");
    }
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    if (name.length < this.NAME_MIN_LENGTH) {
      throw new Error(`min of ${this.NAME_MIN_LENGTH} chars is required.`);
    }
    this.name = name;
  }
}
