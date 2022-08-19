import Item from "../Item";

export interface IDiscount {
  getTotalAfterDiscount(item: Item): number;
}