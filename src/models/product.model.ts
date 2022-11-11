import Client from '../database';

export type Product = {
  id?: String;
  name: String;
  price: Number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get products: ${error}`);
    }
  }

  async show(id: String): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE id = ($1)`;

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to get product ${id}: ${error}`);
    }
  }

  async create(product: Product): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`;

      const result = await conn.query(sql, [product.name, product.price]);

      const newProdcut = result.rows[0];

      conn.release();

      return newProdcut;
    } catch (error) {
      throw new Error(`unable to create product: ${error}`);
    }
  }
}
