import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import usersRoutes from './controllers/users.controller';
import productRoutes from './controllers/products.controller';
import orderRoutes from './controllers/orders.controller';

dotenv.config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) =>
  res.json({ message: `${process.env.POSTGRES_USER}` })
);

usersRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(PORT, () =>
  console.log(`server running on: http://localhost:${PORT}`)
);

export default app;
