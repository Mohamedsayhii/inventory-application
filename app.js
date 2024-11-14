require('dotenv').config();
const express = require('express');
const app = express();
const path = require('node:path');

const indexRouter = require('./routes/indexRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const itemsRouter = require('./routes/itemsRouter');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => console.log(`express server listening on port ${PORT}`));
