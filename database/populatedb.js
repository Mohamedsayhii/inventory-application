const { Client } = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255)
);

INSERT INTO categories (name)
VALUES
    ('Drupes'),
    ('Berries'),
    ('Pomes');

CREATE TABLE items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    price INT,
    categoryId INT,
    CONSTRAINT FK_items_categories FOREIGN KEY(categoryId) REFERENCES categories(id)
);

INSERT INTO items (name, price, categoryId)
VALUES
    ('Peaches', 15, 1),
    ('Strawberry', 22, 2),
    ('Apple', 10, 3);
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString:
			'postgresql://mohamedsayhi:123456789@localhost:5432/inventory',
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main();
