#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  category_name VARCHAR (255) UNIQUE
);

INSERT INTO categories (category_name) 
VALUES
  ('None'),
  ('Weapons'),
  ('Armor'),
  ('Items')
ON CONFLICT (category_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS makers (
  id SERIAL PRIMARY KEY,
  maker_name VARCHAR (255) UNIQUE
);

INSERT INTO makers (maker_name) 
VALUES
  ('None'),
  ('Kingdom'),
  ('Empire'),
  ('Plains')
ON CONFLICT (maker_name) DO NOTHING;

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(255) UNIQUE,
  price NUMERIC(10, 2),
  quantity INTEGER CHECK (quantity >= 0),
  category_id INTEGER REFERENCES categories(id),
  maker_id INTEGER REFERENCES makers(id)
);

INSERT INTO items (item_name, price, quantity, category_id, maker_id) 
VALUES 
  (
    'Steel Sword',
    99.99,
    10,
    (SELECT id FROM categories WHERE category_name = 'Weapons'),
    (SELECT id FROM makers WHERE maker_name = 'Kingdom')
  ),
  (
    'Golden Armor',
    149.50,
    5,
    (SELECT id FROM categories WHERE category_name = 'Armor'),
    (SELECT id FROM makers WHERE maker_name = 'Empire')
  ),
  (
    'Health Potion',
    15.25,
    20,
    (SELECT id FROM categories WHERE category_name = 'Items'),
    (SELECT id FROM makers WHERE maker_name = 'Plains')
  )
ON CONFLICT (item_name) DO NOTHING;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost",
    user: "alex",
    database: "inventory",
    password: "#100Is100",
    port: 5432,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();