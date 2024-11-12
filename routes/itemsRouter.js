const { Router } = require('express');
const {
	getItems,
	createItemGet,
	createItemPost,
} = require('../controllers/itemsController');

const itemsRouter = Router();

itemsRouter.get('/', getItems);
itemsRouter.get('/create', createItemGet);
itemsRouter.post('create', createItemPost);

module.exports = itemsRouter;
