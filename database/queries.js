const pool = require('./pool');

async function getAllCategories() {
	const { rows } = await pool.query('SELECT * FROM categories;');
	return rows;
}

async function insertCategory(categoryName) {
	await pool.query('INSERT INTO categories (name) VALUES ($1)', [
		categoryName,
	]);
}

module.exports = { getAllCategories, insertCategory };
