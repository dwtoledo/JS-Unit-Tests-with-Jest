import Cart from "./Cart";
import Item from "./Item";
import Product from "./Product";

describe("Cart Class", () => {
  let cart: Cart;
  beforeEach(() => {
    cart = new Cart();
  });

  it("should return 0 when getTotal function is executed in a newly created Cart", () => {
    expect(cart.getTotal()).toBe(0);
  });

  it("should multiply items quantity by products price, sum all and return the total", () => {
    const mocked_product_1 = new Product();
    mocked_product_1.setName("Mocked Product 1");
    mocked_product_1.setPrice(10);

    const mocked_item_1 = new Item(1, mocked_product_1);
    cart.add(mocked_item_1);

    const mocked_product_2 = new Product();
    mocked_product_2.setName("Mocked Product 2");
    mocked_product_2.setPrice(15);

    const mocked_item_2 = new Item(3, mocked_product_2);
    cart.add(mocked_item_2);

    expect(cart.getTotal()).toBe(55);
  });

  it("should ensure to update the product quantity if the same product was already added before", () => {
    const mocked_product_1 = new Product();
    mocked_product_1.setName("Mocked Product 1");
    mocked_product_1.setPrice(10);

    const mocked_item_1 = new Item(8, mocked_product_1);
    cart.add(mocked_item_1);

    const mocked_item_2 = new Item(5, mocked_product_1);
    cart.add(mocked_item_2);

    expect(cart.getTotal()).toBe(50);
  });
});
