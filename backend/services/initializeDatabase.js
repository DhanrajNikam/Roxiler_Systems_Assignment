// services/initializeDatabase.js
const axios = require('axios');
const db = require('../config/db');

const initializeDatabase = async () => {
  try {
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
    const response = await axios.get(url);
    const transactions = response.data;

    const query = `
      INSERT INTO transactions (title, description, price, category, dateOfSale, sold)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    transactions.forEach(transaction => {
      const values = [
        transaction.title,
        transaction.description,
        transaction.price,
        transaction.category,
        transaction.dateOfSale,
        transaction.sold
      ];

      db.query(query, values, (err, result) => {
        if (err) throw err;
        console.log('Transaction inserted: ', result.insertId);
      });
    });
  } catch (error) {
    console.error('Error initializing database: ', error);
  }
};

module.exports = initializeDatabase;
