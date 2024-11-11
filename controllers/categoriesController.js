const db = require('../database/queries');

async function getCategories(req, res) {
	const categories = db.getAllCategories();
	res.render('category', { categories: categories });
}

async function createCategoryGet(req, res) {
	res.render('categoryForm', { title: 'Create Category' });
}

async function createCategoryPost(req, res) {
	const { categoryName } = req.body;
	db.insertCategory(categoryName);
	res.redirect('/category');
}

module.exports = { getCategories, createCategoryGet, createCategoryPost };
