const express = require('express');
const db = require("../config/db");

const router = express.Router();

// API for statistics
router.get('/statistics/:month', (req, res) => {
    const { month } = req.params;
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth() + 1; // Convert month name to number

    // Query to get total sales and total sold items
    const totalSalesQuery = `
        SELECT SUM(price) AS totalSaleAmount, COUNT(*) AS totalSoldItems
        FROM transactions
        WHERE MONTH(dateOfSale) = ?
        AND sold = true
    `;

    // Query to get total not sold items
    const totalNotSoldItemsQuery = `
        SELECT COUNT(*) AS totalNotSoldItems
        FROM transactions
        WHERE MONTH(dateOfSale) = ?
        AND sold = false
    `;

    // Execute the total sales query
    db.query(totalSalesQuery, [monthNumber], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message }); // Handle error
        }

        const totalSaleAmount = results[0].totalSaleAmount || 0;
        const totalSoldItems = results[0].totalSoldItems || 0;

        // Execute the total not sold items query
        db.query(totalNotSoldItemsQuery, [monthNumber], (err, notSoldResults) => {
            if (err) {
                return res.status(500).json({ error: err.message }); // Handle error
            }

            const totalNotSoldItems = notSoldResults[0].totalNotSoldItems || 0;

            // Send the combined response
            return res.json({
                totalSaleAmount,
                totalSoldItems,
                totalNotSoldItems
            });
        });
    });
});

module.exports = router;