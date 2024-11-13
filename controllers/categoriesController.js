const db = require('../database/queries');

async function getCategories(req, res) {
	const categories = await db.getAllCategories();
	res.render('categories', { categories: categories });
}

async function createCategoryGet(req, res) {
	res.render('categoryForm', { title: 'Create Category' });
}

async function createCategoryPost(req, res) {
	const { categoryName } = req.body;
	await db.insertCategory(categoryName);
	res.redirect('/categories');
}

module.exports = { getCategories, createCategoryGet, createCategoryPost };
