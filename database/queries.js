const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM categories');
	return rows;
}

async function getCategory(categoryName) {
	const { rows } = await pool.query(
		'SELECT items.name, items.price FROM items INNER JOIN categories ON items.categoryId = categories.id WHERE categories.name = ($1)',
		[categoryName]
	);
	return rows;
}

async function insertCategory(categoryName) {
	await pool.query('INSERT INTO categories (name) VALUES ($1)', [
		categoryName,
	]);
}

async function getAllItems() {
	const { rows } = await pool.query('SELECT name, price FROM items');
	return rows;
}

async function insertItem(itemName, price, categoryName) {
	await pool.query(
		'INSERT INTO items (name, price, categoryId) VALUES ($1, $2, (SELECT id FROM categories WHERE name = ($3)))',
		[itemName, price, categoryName]
	);
}

async function deleteCategory(categoryName) {
	await pool.query(
		'DELETE FROM items WHERE categoryId = (SELECT id FROM categories WHERE name = ($1))',
		[categoryName]
	);
	await pool.query('DELETE FROM categories WHERE name = ($1)', [
		categoryName,
	]);
}

async function deleteItem(itemName) {
	await pool.query('DELETE FROM items WHERE name = ($1)', [itemName]);
}

module.exports = {
	getAllCategories,
	getCategory,
	insertCategory,
	getAllItems,
	insertItem,
	deleteCategory,
	deleteItem,
};
