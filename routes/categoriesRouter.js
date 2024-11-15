const { Router } = require('express');
const {
	createCategoryGet,
	createCategoryPost,
	getCategories,
	deleteCategoryPost,
	editCategoryGet,
	getCategoryItems,
	editCategoryPost,
} = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', createCategoryGet);
categoriesRouter.post('/create', createCategoryPost);
categoriesRouter.get('/:categoryName', getCategoryItems);
categoriesRouter.get('/:categoryName/edit', editCategoryGet);
categoriesRouter.post('/:categoryName/edit', editCategoryPost);
categoriesRouter.post('/:categoryName/delete', deleteCategoryPost);

module.exports = categoriesRouter;
