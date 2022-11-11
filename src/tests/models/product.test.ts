import { Product, ProductStore } from '../../models/product.model';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined;
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined;
  });
  it('should have a create method', () => {
    expect(store.create).toBeDefined;
  });
  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
