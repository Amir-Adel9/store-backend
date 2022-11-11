import { User, UserStore } from '../../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined;
  });
  it('should have a show method', () => {
    expect(store.show).toBeDefined;
  });
  it('should have a create method', () => {
    expect(store.create).toBeDefined;
  });
  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined;
  });
  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
