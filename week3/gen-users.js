const _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;

function randomDate() {
	const start = new Date(2010,0,1);
	const end = new Date();
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomTransaction() {
	const date = randomDate();
	return {
		date,
		charge: _.random(-1000,1000)
	}
}

const dbName = 'week3';
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client) {
	if (err) {
		console.error('FATAL ERROR', e);
		return;
	}
  const db = client.db(dbName);
	for (let i = 0; i < 200000; i++) {
		const numTransactions = _.random(0, 20);
		db.collection('users').insert({
			name: `User ${_.random(1, 100)} ${i}`,
			userId: String(i),
			settings: {
					useDarkMode: Math.random() > 0.5,
					language: Math.random() > 0.75 ? 'spanish' : 'english' 
			},
			contact: {
					email: 'user_' + i + '@gmail.com'    
			},
			transactions: _.times(numTransactions, randomTransaction)
		});
	}
	
  client.close();
});

