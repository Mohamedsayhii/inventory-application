const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM categories');
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
	const categoryId =
		categoryName == 'Drupes' ? 1 : categoryName === 'Berries' ? 2 : 3;
	await pool.query(
		'INSERT INTO items (name, price, categoryId) VALUES ($1, $2, $3)',
		[itemName, price, categoryId]
	);
}

module.exports = { getAllCategories, insertCategory, getAllItems, insertItem };
