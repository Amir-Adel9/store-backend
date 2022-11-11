import Client from '../database';

export type Order = {
  id?: Number;
  status: String;
  user_id?: BigInt;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get orders: ${error}`);
    }
  }

  async show(user_id: String): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM orders WHERE user_id = ($1)`;

      const result = await conn.query(sql, [user_id]);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Unable to get orders: ${error}`);
    }
  }

  async create(order: Order): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *`;

      const result = await conn.query(sql, [order.status, order.user_id]);

      const newProdcut = result.rows[0];

      conn.release();

      return newProdcut;
    } catch (error) {
      throw new Error(`unable to create order: ${error}`);
    }
  }

  async addProduct(
    quantity: Number,
    orderId: String,
    productId: String
  ): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *`;

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const newOrder = result.rows[0];

      conn.release;

      return newOrder;
    } catch (error) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${error}`
      );
    }
  }
}
