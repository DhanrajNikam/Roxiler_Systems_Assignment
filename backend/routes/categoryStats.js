// routes/categoryStats.js
const express = require("express");
const db = require("../config/db");
const router = express.Router();

router.get("/category_stats", (req, res) => {
    const { month } = req.query;

    const query = `
        SELECT category, COUNT(*) AS count
        FROM transactions
        WHERE MONTH(dateOfSale) = MONTH(STR_TO_DATE(?, '%M'))
        GROUP BY category
    `;

    db.query(query, [month], (err, results) => {
        if (err) {
        return res.status(500).send("Database Error");
        }
        res.json(results);
    });
});

module.exports = router;
