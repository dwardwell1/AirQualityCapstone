const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

//middleware
app.use(cors());

//allow access to request to body to retrieve json data
app.use(express.json());

//routes//
//test route
app.get('/users', (req, res) => {
	try {
		pool.query('SELECT * FROM users', (err, rows) => {
			if (err) {
				throw err;
			}
			res.json(rows.rows);
		});
	} catch (err) {
		console.log(err);
	}
});

app.post('/users', async (req, res) => {
	//await))
	try {
		const { username, email, password } = req.body;

		const duplicateCheck = await pool.query(`SELECT username FROM users WHERE username = $1`, [ username ]);

		console.log(duplicateCheck.rows);

		if (duplicateCheck.rows[0]) throw res.json({ error: 'Username already exists' });

		const newUser = await pool.query(
			'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
			[ username, email, password ]
		);
		res.json(newUser.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//create a new user

app.listen(5000, () => {
	console.log('Server is running on port 5000');
});
