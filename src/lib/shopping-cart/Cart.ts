import Checkout from "./Checkout";
import Item from "./Item";
import Product from "./Product";

export default class Cart {
  private _items: Array<Item>;

  constructor() {
    this._items = new Array<Item>();
  }

  public add(item: Item): void {
    let itemIndex = this._items.findIndex(
      (_item) => _item.getProduct() == item.getProduct()
    );

    if (itemIndex == -1) {
      this._items.push(item);
    } else {
      this._items[itemIndex].updateQuantity(item.getQuantity());
    }
  }

  public getTotal(): number {
    if (!this._items.length) {
      return 0;
    }

    let total = 0;
    this._items.forEach((item) => {
      total = total + this.calculateItemTotalAfterDiscount(item);
    });

    return total;
  }

  private calculateItemTotalAfterDiscount(item: Item): number {
    let discountPercentage = 0;

    if (item.getPercentageDiscountCondition()) {
      if (item.getQuantity() >= item.getPercentageDiscountCondition().getMinimumQuantity()) {
        discountPercentage = item.getPercentageDiscountCondition().getPercentage();
      }
    }

    const total = item.getQuantity() * item.getProduct().getPrice();
    const discount = total * (discountPercentage / 100);

    return (total - discount);
  }

  public remove(product: Product): void {
    if (this._items.length) {
      let itemIndex = this._items.findIndex(
        (_item) => _item.getProduct() == product
      );
      if (itemIndex != -1) {
        this._items = this._items.splice(itemIndex, 1);
      }
    }
  }

  public getItems(): Array<Item> {
    return this._items;
  }

  public checkout(): Checkout {
    const checkout = this.prepareCheckout();
    this.reset();

    return checkout;
  }

  private prepareCheckout(): Checkout {
    if (!this._items.length) {
      throw new Error("there are no items for checkout");
    }
    return new Checkout(this._items, this.getTotal());
  }

  private reset(): void {
    this._items = new Array<Item>;
  }

  public summary(): Checkout {
    return this.prepareCheckout();
  }
}
