import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TransactionStatistics.css";

const TransactionStatistics = ({ selectedMonth }) => {
  const [totalSaleAmount, setTotalSaleAmount] = useState(0);
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // Function to fetch transaction statistics from the backend
  const fetchTransactionStatistics = () => {
    setLoading(true);
    axios
      .get(`http://localhost:3333/statistics:month`, {
        params: { month: selectedMonth }, // Send selectedMonth as a query parameter
      })
      .then((response) => {
        const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = response.data;
        setTotalSaleAmount(totalSaleAmount);
        setTotalSoldItems(totalSoldItems);
        setTotalNotSoldItems(totalNotSoldItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transaction statistics:", error);
        setLoading(false);
      });
  };

  // Fetch data when the component is mounted or when selectedMonth changes
  useEffect(() => {
    fetchTransactionStatistics();
  }, [selectedMonth]);

  return (
    <div className="statistics">
      <h3>Transaction Statistics</h3>

      {/* Loading Spinner */}
      {loading && <div>Loading...</div>}

      {/* Transaction Statistics Data */}
      {!loading && (
        <>
          <p>Total Sale Amount: ${totalSaleAmount}</p>
          <p>Total Sold Items: {totalSoldItems}</p>
          <p>Total Not Sold Items: {totalNotSoldItems}</p>
        </>
      )}
    </div>
  );
};

export default TransactionStatistics;
