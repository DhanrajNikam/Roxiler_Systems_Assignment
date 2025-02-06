const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.get('/bar_chart', (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    // Define the price ranges
    const ranges = [
        { low: 0, high: 100 },
        { low: 101, high: 200 },
        { low: 201, high: 300 },
        { low: 301, high: 400 },
        { low: 401, high: 500 },
        { low: 501, high: 600 },
        { low: 601, high: 700 },
        { low: 701, high: 800 },
        { low: 801, high: 900 },
        { low: 901, high: Infinity }
    ];

    // Create an array of promises for each price range query
    const priceStatsPromises = ranges.map(range => {
        const query = `
            SELECT COUNT(*) AS count
            FROM transactions
            WHERE MONTH(dateOfSale) = MONTH(STR_TO_DATE(?, '%M'))
            AND price BETWEEN ? AND ?
        `;

        return new Promise((resolve, reject) => {
            db.query(query, [month, range.low, range.high], (err, result) => {
                if (err) {
                    return reject(err); // Reject the promise on error
                }
                resolve({
                    price_range: `${range.low}-${range.high}`,
                    count: result[0].count
                });
            });
        });
    });

    // Execute all promises and send the response
    Promise.all(priceStatsPromises)
        .then(priceStats => {
            // Return the data in a format that suits the bar chart (x-axis: price range, y-axis: count)
            const chartData = priceStats.map(stat => ({
                label: stat.price_range,
                value: stat.count
            }));

            res.json(chartData);  // Send the bar chart data as JSON
        })
        .catch(err => {
            res.status(500).json({ error: 'Database Error: ' + err.message });
        });
});

module.exports = router;
