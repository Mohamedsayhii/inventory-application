const { Router } = require('express');
const {
	createCategoryGet,
	createCategoryPost,
	getCategories,
	getCategory,
} = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', createCategoryGet);
categoriesRouter.post('/create', createCategoryPost);
categoriesRouter.get('/:categoryName', getCategory);

module.exports = categoriesRouter;
