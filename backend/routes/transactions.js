const express = require('express');
const db = require('../config/db'); // Assuming db.js contains MySQL connection
const router = express.Router();

// Helper function to handle pagination and search
const getPaginationQuery = (page, per_page, search) => {
  const offset = (page - 1) * per_page;
  const searchTerm = `%${search}%`;
  
  // Return query and values for MySQL
  return {
    query: `
      SELECT * FROM transactions
      WHERE title LIKE ? OR description LIKE ? OR price LIKE ?
      LIMIT ? OFFSET ?
    `,
    values: [searchTerm, searchTerm, searchTerm, parseInt(per_page), offset]
  };
};

// Route to list transactions with search and pagination
router.get('/transactions', (req, res) => {
  const { page = 1, per_page = 10, search = '' } = req.query;

  // Prepare the SQL query and values
  const { query, values } = getPaginationQuery(page, per_page, search);

  // Query the database
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database Error', details: err });
    }
    res.json({
      page,
      per_page,
      results,
    });
  });
});

module.exports = router;
