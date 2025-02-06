// routes/combinedStats.js
const express = require('express');
const statisticsRouter = require('./statistics');
const priceRangeRouter = require('./priceRange');
const categoryStatsRouter = require('./categoryStats');

const router = express.Router();

router.get('/combined_stats', async (req, res) => {
  const { month } = req.query;

  try {
    const statistics = await getStatistics(month);
    const priceRangeStats = await getPriceRangeStats(month);
    const categoryStats = await getCategoryStats(month);

    res.json({
      statistics,
      price_range: priceRangeStats,
      category_stats: categoryStats
    });
  } catch (error) {
    res.status(500).send('Error fetching combined stats');
  }
});

async function getStatistics(month) {
  // Call statistics API logic
}

async function getPriceRangeStats(month) {
  // Call price range API logic
}

async function getCategoryStats(month) {
  // Call category stats API logic
}

module.exports = router;
