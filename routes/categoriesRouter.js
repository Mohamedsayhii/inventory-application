const { Router } = require('express');
const {
	createCategoryGet,
	createCategoryPost,
	getCategories,
	deleteCategoryPost,
	editCategoryGet,
	getCategoryItems,
	editCategoryPost,
	validateCategory,
} = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', createCategoryGet);
categoriesRouter.post('/create', validateCategory, createCategoryPost);
categoriesRouter.get('/:categoryName', getCategoryItems);
categoriesRouter.get('/:categoryName/edit', editCategoryGet);
categoriesRouter.post(
	'/:categoryName/edit',
	validateCategory,
	editCategoryPost
);
categoriesRouter.post('/:categoryName/delete', deleteCategoryPost);

module.exports = categoriesRouter;
