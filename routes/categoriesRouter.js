const { Router } = require('express');
const {
	createCategoryGet,
	createCategoryPost,
	getCategories,
} = require('../controllers/categoriesController');

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);
categoriesRouter.get('/create', createCategoryGet);
categoriesRouter.post('/create', createCategoryPost);

module.exports = categoriesRouter;
