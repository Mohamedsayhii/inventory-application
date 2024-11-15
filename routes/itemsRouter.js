const { Router } = require('express');
const {
	getItems,
	createItemGet,
	createItemPost,
	deleteItemPost,
	editItemGet,
	editItemPost,
} = require('../controllers/itemsController');

const itemsRouter = Router();

itemsRouter.get('/', getItems);
itemsRouter.get('/create', createItemGet);
itemsRouter.post('/create', createItemPost);
itemsRouter.get('/:itemName/edit', editItemGet);
itemsRouter.post('/:itemName/edit', editItemPost);
itemsRouter.post('/:itemName/delete', deleteItemPost);

module.exports = itemsRouter;
