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

async function deleteItemByName(itemName) {
  await pool.query("DELETE FROM items WHERE item_name = $1", [itemName]);
}

async function deleteItemByID(itemId) {
  await pool.query("DELETE FROM items WHERE id = $1", [itemId]);
}

async function deleteCategoryReassignItems(categoryName) {
  //Gather ID number for None category
  const { rows } = await pool.query("SELECT id FROM categories WHERE category_name = 'None'");
  const noneID = rows[0].id;

  //Update Items with category to be deleted to the None category
  const updateQuery = `UPDATE items 
    SET category_id = $1
    WHERE category_id = (SELECT id FROM categories WHERE category_name = $2)
    `;
  await pool.query(updateQuery, [noneID, categoryName]);
  await pool.query("DELETE FROM categories WHERE category_name = $1", [categoryName]);
}

async function deleteMakerReassignItems(makerName) {
  //Gather ID number for None category
  const { rows } = await pool.query("SELECT id FROM makers WHERE maker_name = 'None'");
  const noneID = rows[0].id;

  //Update Items with category to be deleted to the None category
  const updateQuery = `UPDATE items 
    SET maker_id = $1
    WHERE maker_id = (SELECT id FROM makers WHERE maker_name = $2)
    `;
  await pool.query(updateQuery, [noneID, makerName]);
  await pool.query("DELETE FROM makers WHERE maker_name = $1", [makerName]);
}

module.exports = {
  getAllItems,
  getAllItemsLike,
  getAllCategories,
  getAllMakers,
  insertItem,
  insertCategory,
  insertMaker,
  deleteItemByName,
  deleteItemByName,
  deleteCategoryReassignItems,
  deleteMakerReassignItems
};
