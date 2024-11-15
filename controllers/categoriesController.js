const db = require('../database/queries');

async function getCategories(req, res) {
	const categories = await db.getAllCategories();
	res.render('categories', { categories: categories });
}

async function getCategory(req, res) {
	const { categoryName } = req.params;
	const categoryItems = await db.getCategory(categoryName);
	res.render('category', {
		categoryName: categoryName[0].toUpperCase() + categoryName.substr(1),
		categoryItems: categoryItems,
	});
}

async function createCategoryGet(req, res) {
	res.render('categoryForm', { title: 'Create Category' });
}

async function createCategoryPost(req, res) {
	const { categoryName } = req.body;
	await db.insertCategory(categoryName);
	res.redirect('/categories');
}

async function deleteCategoryPost(req, res) {
	const { categoryName } = req.params;
	await db.deleteCategory(categoryName);
	res.redirect('/categories');
}

module.exports = {
	getCategories,
	getCategory,
	createCategoryGet,
	createCategoryPost,
	deleteCategoryPost,
};
