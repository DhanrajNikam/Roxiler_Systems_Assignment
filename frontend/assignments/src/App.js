import axios from "axios";
import React, { useEffect, useState } from "react";
import BarChart from "./components/BarChart";
import TransactionsTable from "./components/TransactionsTable";
import TransactionStatistics from "./components/TransactionStatistics";

const App = () => {
  const [month, setMonth] = useState("March");
  const [transactions, setTransactions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [barChartData, setBarChartData] = useState([]);

  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ];

  // Fetch transactions from the API
  const fetchTransactions = () => {
    axios
      .get(`http://localhost:3333/transactions`)
      .then(response => setTransactions(response.data))
      .catch(error => console.error(error));
  };

  // Fetch transaction statistics
  const fetchStatistics = () => {
    axios
      .get(`http://localhost:3333/statistics?month=${month}`)
      .then(response => {
        setTotalSaleAmount(response.data.totalSaleAmount);
        setTotalSoldItems(response.data.totalSoldItems);
        setTotalNotSoldItems(response.data.totalNotSoldItems);
      })
      .catch(error => console.error(error));
  };

  // Fetch bar chart data
  const fetchBarChartData = () => {
    axios
      .get(`http://localhost:3333/bar_chart?month=${month}`)
      .then(response => setBarChartData(response.data))
      .catch(error => console.error(error));
  };

  // Fetch data whenever the selected month or search text changes
  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
  }, [month, searchText]);

  return (
    <div className="App">
      <div className="controls">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        >
          {months.map((m, idx) => (
            <option key={idx} value={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search transactions..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <TransactionsTable transactions={transactions} />


      <TransactionStatistics
        totalSaleAmount={totalSaleAmount}
        totalSoldItems={totalSoldItems}
        totalNotSoldItems={totalNotSoldItems}
      />

      <BarChart data={barChartData} />
    </div>
  );
}

export default App;
