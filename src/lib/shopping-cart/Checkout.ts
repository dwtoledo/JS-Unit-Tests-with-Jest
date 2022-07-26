import Item from "./Item";

export default class Checkout {
  private _total: number;
  private _items: Array<Item>;

  constructor(items: Array<Item>, total: number) {
    if (total < 0) {
      throw new Error("negative values not allowed for total");
    }

    if (!items.length) {
      throw new Error("no items found for checkout process");
    }

    this._total = total;
    this._items = items;
  }

  public getTotal(): number {
    return this._total;
  }

  public getItems(): Array<Item> {
    return this._items;
  }
}
