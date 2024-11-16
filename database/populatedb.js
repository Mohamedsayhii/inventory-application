const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255)
);

INSERT INTO categories (name)
VALUES
    ('drupes'),
    ('berries'),
    ('pomes');

CREATE TABLE items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    price INT,
    categoryId INT,
    CONSTRAINT FK_items_categories FOREIGN KEY(categoryId) REFERENCES categories(id)
);

INSERT INTO items (name, price, categoryId)
VALUES
    ('peaches', 15, 1),
    ('almonds', 6, 1),
    ('strawberry', 22, 2),
    ('apple', 10, 3),
    ('bananas', 22, 2),
    ('cherry', 7, 2),
    ('grapes', 5, 2),
    ('pears', 12, 3);
`;

async function localDB() {
	console.log('local seeding...');
	const client = new Client({
		connectionString:
			'postgresql://mohamedsayhi:123456789@localhost:5432/inventory',
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('local done');
}

async function cloudDB() {
	console.log('cloud seeding...');
	const client = new Client({
		connectionString:
			'postgresql://postgres:AbrhAHCLxyMaLXeQOeiYtWzfxntNfTDE@junction.proxy.rlwy.net:19731/railway',
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('cloud done');
}

localDB();
cloudDB();
