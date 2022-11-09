CREATE TABLE order_products(
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id BIGINT REFERENCES orders(id),
    producut_id BIGINT REFERENCES products(id)
);