const db = require('../database/queries');
const { body, validationResult } = require('express-validator');

const alphaErr = 'must only contain letters.';

validateCategory = [
	body('categoryName')
		.notEmpty()
		.trim()
		.isAlpha()
		.withMessage(`Category ${alphaErr}`),
];

async function getCategories(req, res) {
	const categories = await db.getAllCategories();
	res.render('categories', { categories: categories });
}

async function getCategoryItems(req, res) {
	const { categoryName } = req.params;
	const categoryItems = await db.getCategoryItems(categoryName);
	res.render('category', {
		categoryName: categoryName[0].toUpperCase() + categoryName.substr(1),
		categoryItems: categoryItems,
	});
}

async function createCategoryGet(req, res) {
	res.render('categoryForm', {
		category: undefined,
		title: 'Create Category',
	});
}

async function createCategoryPost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).render('categoryForm', {
			category: undefined,
			title: 'Create Category',
			errors: errors.array(),
		});
	}

	const { categoryName } = req.body;
	await db.insertCategory(categoryName);
	res.redirect('/categories');
}

async function editCategoryGet(req, res) {
	const { categoryName } = req.params;
	const [category] = await db.getCategory(categoryName);
	res.render('categoryForm', { category: category, title: 'Edit Category' });
}

async function editCategoryPost(req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const { categoryName } = req.params;
		const [category] = await db.getCategory(categoryName);
		return res.status(400).render('categoryForm', {
			category: category,
			title: 'Edit Category',
			errors: errors.array(),
		});
	}

	const { categoryName } = req.body;
	await db.editCategory(categoryName, req.params.categoryName);
	res.redirect('/categories');
}

async function deleteCategoryPost(req, res) {
	const { categoryName } = req.params;
	await db.deleteCategory(categoryName);
	res.redirect('/categories');
}

module.exports = {
	validateCategory,
	getCategories,
	getCategoryItems,
	createCategoryGet,
	createCategoryPost,
	editCategoryGet,
	editCategoryPost,
	deleteCategoryPost,
};
