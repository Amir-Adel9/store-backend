import { Order, OrderStore } from '../../models/order.model';
import dotenv from 'dotenv';

dotenv.config();

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined;
  });
  it('should have a create method', () => {
    expect(store.create).toBeDefined;
  });
  it('should have an addProduct method', () => {
    expect(store.addProduct).toBeDefined;
  });
  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
