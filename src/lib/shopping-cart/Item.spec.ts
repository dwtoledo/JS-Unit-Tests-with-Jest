import Item from "./Item";

describe("Item Class", () => {
  it("should not create an item with negative quantity", () => {
    expect(() => {
      const item = new Item(-2);
    }).toThrowError();
  });
});
