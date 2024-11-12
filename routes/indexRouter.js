const { Router } = require('express');
const homepageGet = require('../controllers/indexController');

const indexRouter = Router();

indexRouter.get('/', homepageGet);

module.exports = indexRouter;
