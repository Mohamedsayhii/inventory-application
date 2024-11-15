const { Router } = require('express');
const {
	createCategoryGet,
	createCategoryPost,
	getCategories,
	getCategory,
	deleteCategoryPost,
} = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', createCategoryGet);
categoriesRouter.post('/create', createCategoryPost);
categoriesRouter.get('/:categoryName', getCategory);
categoriesRouter.post('/:categoryName/delete', deleteCategoryPost);

module.exports = categoriesRouter;
