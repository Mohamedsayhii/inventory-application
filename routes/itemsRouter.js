const { Router } = require('express');
const {
	getItems,
	createItemGet,
	createItemPost,
	deleteItemPost,
} = require('../controllers/itemsController');

const itemsRouter = Router();

itemsRouter.get('/', getItems);
itemsRouter.get('/create', createItemGet);
itemsRouter.post('/create', createItemPost);
// itemsRouter.get('/:itemName', editItemGet);
// itemsRouter.post('/:itemName', editItemPost);
itemsRouter.post('/:itemName/delete', deleteItemPost);

module.exports = itemsRouter;
