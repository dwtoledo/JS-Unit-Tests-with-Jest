import Cart from "./Cart";
import Checkout from "./Checkout";
import { PercentageCondition } from "./discounts/PercentageCondition";
import { QuantityCondition } from "./discounts/QuantityCondition";
import Item from "./Item";
import Product from "./Product";

describe("Cart Class", () => {
  let cart: Cart;
  let mocked_product_1: Product;
  let mocked_product_2: Product;
  let mocked_product_3: Product;

  beforeEach(() => {
    cart = new Cart();

    mocked_product_1 = new Product();
    mocked_product_1.setName("Mocked Product 1");
    mocked_product_1.setPrice(10);

    mocked_product_2 = new Product();
    mocked_product_2.setName("Mocked Product 2");
    mocked_product_2.setPrice(15);

    mocked_product_3 = new Product();
    mocked_product_3.setName("Mocked Product 3");
    mocked_product_3.setPrice(8);
  });

  describe("Add and remove cart items - Update total value", () => {
    it("should return 0 when getTotal function is executed in a newly created Cart", () => {
      expect(cart.getTotal()).toBe(0);
    });

    it("should multiply items quantity by products price, sum all and return the total", () => {
      const mocked_item_1 = new Item(1, mocked_product_1);
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(3, mocked_product_2);
      cart.add(mocked_item_2);

      expect(cart.getTotal()).toBe(55);
    });

    it("should update the product quantity if the same product was already added before", () => {
      const mocked_item_1 = new Item(8, mocked_product_1);
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(5, mocked_product_1);
      cart.add(mocked_item_2);

      expect(cart.getTotal()).toBe(50);
    });

    it("should remove a product without errors even if the product was not included before on cart", () => {
      const mocked_item_1 = new Item(2, mocked_product_1);
      cart.add(mocked_item_1);

      expect(() => {
        cart.remove(mocked_product_2);
      }).not.toThrowError();
    });

    it("should update the total when a product from cart was removed and getTotal function is called", () => {
      const mocked_item_1 = new Item(2, mocked_product_1);
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(2, mocked_product_2);
      cart.add(mocked_item_2);

      cart.remove(mocked_product_1);

      expect(cart.getTotal()).toBe(20);
    });
  });

  describe("Checkout process", () => {
    it("should create and return all cart items and the total", () => {
      const mocked_item_1 = new Item(1, mocked_product_1);
      const mocked_item_2 = new Item(3, mocked_product_2);
      const mocked_checkout = new Checkout([mocked_item_1, mocked_item_2], 55);

      cart.add(mocked_item_1);
      cart.add(mocked_item_2);

      expect(cart.checkout()).toEqual(mocked_checkout);
    });

    it("should throw an error when checkout function is called without added items", () => {
      expect(() => {
        cart.checkout();
      }).toThrowError();
    });

    it("should reset the cart after the checkout is processed", () => {
      const mocked_item_1 = new Item(1, mocked_product_1);
      const mocked_item_2 = new Item(3, mocked_product_2);
      cart.add(mocked_item_1);
      cart.add(mocked_item_2);
      cart.checkout();

      expect(cart.getTotal()).toEqual(0);
    });
  });

  describe("Summary process", () => {
    it("should throw an error when summary function is called without added items", () => {
      expect(() => {
        cart.summary();
      }).toThrowError();
    });

    it("should return the checkout summary without reset the cart", () => {
      const mocked_item_1 = new Item(1, mocked_product_1);
      const mocked_item_2 = new Item(3, mocked_product_2);
      const mocked_summary = new Checkout([mocked_item_1, mocked_item_2], 55);

      cart.add(mocked_item_1);
      cart.add(mocked_item_2);

      expect(cart.summary()).toEqual(mocked_summary);
    });

    it("should not reset the cart after the summary is processed", () => {
      const mocked_item_1 = new Item(1, mocked_product_1);
      const mocked_item_2 = new Item(3, mocked_product_2);
      cart.add(mocked_item_1);
      cart.add(mocked_item_2);
      cart.summary();

      expect(cart.getTotal()).toEqual(55);
    });
  });

  describe('Add Discount Conditions - Update total value', () => {
    it('should update total value with single cart item with percentage discount condition', () => {
      const mocked_item_1 = new Item(2, mocked_product_1);
      mocked_item_1.setDiscountCondition(new PercentageCondition(15, 2));
      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(17);
    });

    it('should update total value with two cart items, one with percentage discount condition and other not', () => {
      const mocked_item_1 = new Item(2, mocked_product_1);
      mocked_item_1.setDiscountCondition(new PercentageCondition(15, 2));
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(5, mocked_product_2);
      cart.add(mocked_item_2);

      expect(cart.getTotal()).toBe(92);
    });

    it('should update total value with multiple cart items with percentage discount condition', () => {
      const mocked_item_1 = new Item(2, mocked_product_1);
      mocked_item_1.setDiscountCondition(new PercentageCondition(15, 2));
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(5, mocked_product_2);
      mocked_item_2.setDiscountCondition(new PercentageCondition(50, 4));
      cart.add(mocked_item_2);

      expect(cart.getTotal()).toBe(54.5);
    });

    it('should update total value with single cart item with quantity discount condition', () => {
      const mocked_item_1 = new Item(3, mocked_product_2);
      mocked_item_1.setDiscountCondition(new QuantityCondition(3, 2));
      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(30);
    });

    it('should update total value with two cart items, one with quantity discount condition and other not', () => {
      const mocked_item_1 = new Item(3, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(3, 1));
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(5, mocked_product_2);
      cart.add(mocked_item_2);

      expect(cart.getTotal()).toBe(85);
    });

    it('should update total value with two cart items, one with quantity discount condition and other with percentage', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(3, 2));
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(5, mocked_product_2);
      mocked_item_2.setDiscountCondition(new PercentageCondition(75, 3))
      cart.add(mocked_item_2);

      expect(cart.getTotal()).toBe(48.75);
    });

    it('should update total value with three cart items, one with quantity discount condition, other with percentage discount condition and the last one without any discount', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(3, 2));
      cart.add(mocked_item_1);

      const mocked_item_2 = new Item(5, mocked_product_2);
      mocked_item_2.setDiscountCondition(new PercentageCondition(75, 3))
      cart.add(mocked_item_2);

      const mocked_item_3 = new Item(2, mocked_product_3);
      cart.add(mocked_item_3);

      expect(cart.getTotal()).toBe(64.75);
    });
  });

  describe('Multiple Discount Conditions for an item', () => {
    it('should choose the best discount condition for an item with multiple discount conditions and update the total value with it', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(4, 2));
      mocked_item_1.setDiscountCondition(new PercentageCondition(75, 3));
      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(10);
    });

    it('should choose the best discount condition for an item with multiple and duplicated discount conditions and update the total value with it', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(4, 2));
      mocked_item_1.setDiscountCondition(new QuantityCondition(4, 2));
      mocked_item_1.setDiscountCondition(new PercentageCondition(75, 3));
      mocked_item_1.setDiscountCondition(new PercentageCondition(75, 3));
      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(10);
    });

    it('should choose the best quantity discount condition for an item and update the total value with it', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(4, 1));
      mocked_item_1.setDiscountCondition(new QuantityCondition(6, 3));
      mocked_item_1.setDiscountCondition(new QuantityCondition(2, 1));

      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(10);
    });

    it('should choose the best percentage discount condition for an item and update the total value with it', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new PercentageCondition(70, 3));
      mocked_item_1.setDiscountCondition(new PercentageCondition(90, 4));
      mocked_item_1.setDiscountCondition(new PercentageCondition(50, 2));

      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(4);
    });

    it('should choose the best discount condition for an item with multiples and duplicated discount conditions and update the total value with it', () => {
      const mocked_item_1 = new Item(4, mocked_product_1);
      mocked_item_1.setDiscountCondition(new QuantityCondition(4, 1));
      mocked_item_1.setDiscountCondition(new QuantityCondition(6, 3));
      mocked_item_1.setDiscountCondition(new QuantityCondition(2, 1));
      mocked_item_1.setDiscountCondition(new PercentageCondition(70, 3));
      mocked_item_1.setDiscountCondition(new PercentageCondition(90, 4));
      mocked_item_1.setDiscountCondition(new PercentageCondition(50, 2));
      mocked_item_1.setDiscountCondition(new QuantityCondition(2, 1));
      mocked_item_1.setDiscountCondition(new PercentageCondition(70, 3));
      mocked_item_1.setDiscountCondition(new PercentageCondition(90, 4));

      cart.add(mocked_item_1);

      expect(cart.getTotal()).toBe(4);
    });
  });


});
