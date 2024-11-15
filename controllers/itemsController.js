const db = require('../database/queries');

async function getItems(req, res) {
	const items = await db.getAllItems();
	res.render('items', { items: items });
}

async function createItemGet(req, res) {
	const categories = await db.getAllCategories();
	res.render('itemForm', { item: undefined, categories: categories });
}

async function createItemPost(req, res) {
	const { name, price, categoryName } = req.body;
	await db.insertItem(name, price, categoryName);
	res.redirect('/items');
}

async function editItemGet(req, res) {
	const categories = await db.getAllCategories();
	const { itemName } = req.params;
	const [item] = await db.getItem(itemName);
	res.render('itemForm', { item: item, categories: categories });
}

async function editItemPost(req, res) {
	const { newItemName, newItemPrice, newItemCategory } = req.body;
	await db.editItem(
		newItemName,
		newItemPrice,
		newItemCategory,
		req.params.itemName
	);
	res.redirect('/items');
}

async function deleteItemPost(req, res) {
	const { itemName } = req.params;
	await db.deleteItem(itemName);
	res.redirect('/items');
}

module.exports = {
	getItems,
	createItemGet,
	createItemPost,
	editItemGet,
	editItemPost,
	deleteItemPost,
};
