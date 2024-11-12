const db = require('../database/queries');

async function getItems(req, res) {
	const items = await db.getAllItems();
	res.render('item', { items: items });
}

async function createItemGet(req, res) {
	res.render('itemForm', { title: 'Create Item' });
}

async function createItemPost(req, res) {
	const { name, price, categoryName } = req.body;
	await db.insertItem(name, price, categoryName);
	res.redirect('/item');
}

module.exports = { getItems, createItemGet, createItemPost };
