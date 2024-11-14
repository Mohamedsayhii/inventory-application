const db = require('../database/queries');

async function getItems(req, res) {
	const items = await db.getAllItems();
	res.render('items', { items: items });
}

async function createItemGet(req, res) {
	const categories = await db.getAllCategories();
	res.render('itemForm', { categories: categories });
}

async function createItemPost(req, res) {
	const { name, price, categoryName } = req.body;
	await db.insertItem(name, price, categoryName);
	res.redirect('/items');
}

module.exports = { getItems, createItemGet, createItemPost };
