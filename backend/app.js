// app.js
const cors = require('cors');
const express = require("express");
const initializeDatabase = require("./services/initializeDatabase");
const transactionRouter = require("./routes/transactions");
const statisticsRouter = require("./routes/statistics");
const priceRangeRouter = require("./routes/priceRange");
const categoryStatsRouter = require("./routes/categoryStats");
const combinedStatsRouter = require("./routes/combinedStats");

const app = express();
app.use(cors());

app.get("/initialize", async (req, res) => {
  await initializeDatabase();
  res.send("Database Initialized with Transaction Data");
});

app.use(transactionRouter);
app.use(statisticsRouter);
app.use(priceRangeRouter);
app.use(categoryStatsRouter);
app.use(combinedStatsRouter);

app.listen(3333, () => {
  console.log("Server running on http://localhost:3333");
});
