import Item from "./Item";

export default class Cart {
  private _items: Array<Item>;

  constructor() {
    this._items = new Array<Item>();
  }

  public add(item: Item): void {
    this._items.push(item);
  }

  public getTotal(): number {
    if (!this._items.length) {
      return 0;
    }

    let total = 0;
    this._items.forEach((item) => {
      total = total + item.getQuantity() * item.getProduct().getPrice();
    });

    return total;
  }
}
