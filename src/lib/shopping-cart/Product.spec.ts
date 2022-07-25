import Product from "./Product";

describe('Product Class', () => {
    let product: Product;

    beforeEach(() => {
        product = new Product();
    });

    it('Throw an error if trying to set a product price with negative value', () => {
        expect(() => {
            product.setPrice(-2);
        }).toThrowError();
    });

    it('Throw an error if trying to set a product price as zero', () => {
        expect(() => {
            product.setPrice(0);
        }).toThrowError();
    });

    it('Throw an error if trying to set a product name with less chars then defined', () => {
        expect(() => {
            product.setName('abcdefghij');
        }).toThrowError();
    });
});
