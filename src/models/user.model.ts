import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id: Number;
  first_name: String;
  last_name: String;
  password: String;
};

export class UserStore {
  async index(id: String): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to show users: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *`;

      const hash = bcrypt.hashSync(
        // @ts-ignore
        user.password + pepper,
        // @ts-ignore
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [
        user.first_name,
        user.last_name,
        hash,
      ]);
      const newUser = result.rows[0];

      conn.release();

      return newUser;
    } catch (err) {
      throw new Error(
        `Unable to create user (${user.first_name} ${user.last_name}): ${err}`
      );
    }
  }

  async authenticate(
    first_name: String,
    last_name: String,
    password: String
  ): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM users WHERE first_name = ($1) AND last_name = ($2)`;

      const result = await conn.query(sql, [first_name, last_name]);

      if (result.rows.length) {
        const user = result.rows[0];

        console.log(user);
        // @ts-ignore
        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(
        `Unable to authenticate user (${first_name} ${last_name}): ${err}`
      );
    }
  }
}
