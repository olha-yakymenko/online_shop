import React, { useState } from 'react';

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end date.');
      return;
    }

    fetch(`http://localhost:5055/sales-report?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch sales report');
        }
        return response.json();
      })
      .then(data => {
        setReportData(data);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching sales report:', err);
        setError('Error fetching report. Please try again.');
      });
  };

  return (
    <div>
      <h1>Sales Report</h1>
      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleGenerateReport}>
          Generate Report
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Quantity Sold</th>
            <th>Total Revenue</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length === 0 ? (
            <tr><td colSpan="4">No data available</td></tr>
          ) : (
            reportData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.totalQuantity}</td>
                <td>{row.totalRevenue}</td>
                <td>{row.date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
