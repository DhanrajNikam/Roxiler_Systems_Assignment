import axios from "axios";
import React, { useEffect, useState } from "react";
import "./TransactionsTable.css";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;
  const [loading, setLoading] = useState(false);

  // Function to fetch transactions from the backend
  const fetchTransactions = (page) => {
    setLoading(true);
    axios
      .get(`http://localhost:3333/transactions`, {
        params: {
          page: page,
          perPage: perPage,
        },
      })
      .then((response) => {
        const { data, totalCount } = response.data; // Assuming the backend sends data and total count of transactions
        setTransactions(data);
        setTotalPages(Math.ceil(totalCount / perPage)); // Calculate total pages based on totalCount
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        setLoading(false);
      });
  };

  // Use effect to fetch data when the component is mounted or page changes
  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  // Handle Next and Previous button clicks
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h3>Transactions</h3>

      {/* Loading Spinner */}
      {loading && <div>Loading...</div>}

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>${transaction.price}</td>
                <td>{transaction.dateOfSale}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsTable;
