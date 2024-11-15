const db = require('../database/queries');

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
	const { newCategoryName } = req.body;
	await db.editCategory(newCategoryName, req.params.categoryName);
	res.redirect('/categories');
}

async function deleteCategoryPost(req, res) {
	const { categoryName } = req.params;
	await db.deleteCategory(categoryName);
	res.redirect('/categories');
}

module.exports = {
	getCategories,
	getCategoryItems,
	createCategoryGet,
	createCategoryPost,
	editCategoryGet,
	editCategoryPost,
	deleteCategoryPost,
};
