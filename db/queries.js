const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function getAllItemsLike(query) {
  const { rows } = await pool.query("SELECT * FROM items WHERE item_name ILIKE $1", [`%${query}%`]);
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllMakers() {
  const { rows } = await pool.query("SELECT * FROM makers");
  return rows;
}

async function insertItem(item, price, quantity, category, maker) {
  const query = `
  INSERT INTO items (item_name, price, quantity, category_id, maker_id)
    VALUES (
      $1, $2, $3,
      (SELECT id FROM categories WHERE category_name = $4),
      (SELECT id FROM makers WHERE maker_name = $5)
    )
    ON CONFLICT (item_name) DO NOTHING;
  `
  await pool.query(query, [item, price, quantity, category, maker]);
}

async function insertCategory(newCategory) {
  const query = `
  INSERT INTO categories (category_name) 
  VALUES
    ($1)
    ON CONFLICT (category_name) DO NOTHING;
  `;
  await pool.query(query, [newCategory]);
}

async function insertMaker(newMaker) {
  const query = `
  INSERT INTO makers (maker_name) 
  VALUES
    ($1)
    ON CONFLICT (maker_name) DO NOTHING;
  `;
  await pool.query(query, [newMaker]);
}

//TODO
//1. Delete query for single item
//2. Delete query for category    Delete all or just change to none?
//3. Delete query for maker       Delete all or just change to none?

async function deleteAllUsernames() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllItems,
  getAllItemsLike,
  getAllCategories,
  getAllMakers,
  insertItem,
  insertCategory,
  insertMaker,
};
