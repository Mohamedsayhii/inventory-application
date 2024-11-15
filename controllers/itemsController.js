const db = require('../database/queries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters.';
const numericErr = 'must only contain numbers.';
const emptyTypeErr = 'must choose type.';

const validateItem = [
	body('itemName')
		.notEmpty()
		.trim()
		.isAlpha()
		.withMessage(`Item name ${alphaErr}`),
	body('itemPrice')
		.notEmpty()
		.trim()
		.isNumeric()
		.withMessage(`Item price ${numericErr}`),
	body('itemCategory').notEmpty().withMessage(`Item type ${emptyTypeErr}`),
];

async function getItems(req, res) {
	const items = await db.getAllItems();
	res.render('items', { items: items });
}

async function createItemGet(req, res) {
	const categories = await db.getAllCategories();
	res.render('itemForm', {
		title: 'Create Item',
		item: undefined,
		categories: categories,
	});
}

async function createItemPost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const categories = await db.getAllCategories();
		return res.status(400).render('itemForm', {
			title: 'Create Item',
			item: undefined,
			categories: categories,
			errors: errors.array(),
		});
	}

	const { itemName, itemPrice, itemCategory } = req.body;
	await db.insertItem(itemName, itemPrice, itemCategory);
	res.redirect('/items');
}

async function editItemGet(req, res) {
	const categories = await db.getAllCategories();
	const { itemName } = req.params;
	const [item] = await db.getItem(itemName);
	res.render('itemForm', {
		title: 'Edit Item',
		item: item,
		categories: categories,
	});
}

async function editItemPost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const categories = await db.getAllCategories();
		const { itemName } = req.params;
		const [item] = await db.getItem(itemName);
		return res.status(400).render('itemForm', {
			title: 'Edit Item',
			item: item,
			categories: categories,
			errors: errors.array(),
		});
	}

	const { itemName, itemPrice, itemCategory } = req.body;
	await db.editItem(itemName, itemPrice, itemCategory, req.params.itemName);
	res.redirect('/items');
}

async function deleteItemPost(req, res) {
	const { itemName } = req.params;
	await db.deleteItem(itemName);
	res.redirect('/items');
}

module.exports = {
	validateItem,
	getItems,
	createItemGet,
	createItemPost,
	editItemGet,
	editItemPost,
	deleteItemPost,
};
