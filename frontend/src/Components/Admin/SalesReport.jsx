// import React, { useState } from 'react';

// const SalesReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [error, setError] = useState('');

//   const handleGenerateReport = () => {
//     if (!startDate || !endDate) {
//       setError('Please select both start and end date.');
//       return;
//     }

//     fetch(`http://localhost:5055/sales-report?startDate=${startDate}&endDate=${endDate}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch sales report');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setReportData(data);
//         setError('');
//       })
//       .catch(err => {
//         console.error('Error fetching sales report:', err);
//         setError('Error fetching report. Please try again.');
//       });
//   };

//   return (
//     <div>
//       <h1>Sales Report</h1>
//       <div>
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//         />
//         <button onClick={handleGenerateReport}>
//           Generate Report
//         </button>
//       </div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <table>
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Total Quantity Sold</th>
//             <th>Total Revenue</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reportData.length === 0 ? (
//             <tr><td colSpan="4">No data available</td></tr>
//           ) : (
//             reportData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.name}</td>
//                 <td>{row.totalQuantity}</td>
//                 <td>{row.totalRevenue}</td>
//                 <td>{row.date}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesReport;

// import React, { useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Importowanie Bootstrap

// const SalesReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleGenerateReport = () => {
//     if (!startDate || !endDate) {
//       setError('Please select both start and end date.');
//       return;
//     }

//     fetch(`http://localhost:5055/sales-report?startDate=${startDate}&endDate=${endDate}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch sales report');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setReportData(data);
//         setError('');
//       })
//       .catch(err => {
//         console.error('Error fetching sales report:', err);
//         setError('Error fetching report. Please try again.');
//       });
//   };

//   // Grupowanie danych po nazwie produktu
//   const products = reportData.reduce((acc, item) => {
//     if (!acc[item.name]) {
//       acc[item.name] = [];
//     }
//     acc[item.name].push({
//       date: item.date,
//       quantity: item.totalQuantity,
//       revenue: item.totalRevenue,
//     });
//     return acc;
//   }, {});

//   // Tworzenie wspólnych danych sprzedaży
//   const allSalesData = reportData.reduce((acc, item) => {
//     const existingData = acc.find(d => d.date === item.date);
//     if (existingData) {
//       existingData.quantity += item.totalQuantity;
//       existingData.revenue += item.totalRevenue;
//     } else {
//       acc.push({
//         date: item.date,
//         quantity: item.totalQuantity,
//         revenue: item.totalRevenue,
//       });
//     }
//     return acc;
//   }, []);

//   // Filtrowanie produktów na podstawie nazwy
//   const filteredProducts = Object.keys(products).filter(productName =>
//     productName.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container my-5">
//       <h1 className="text-center mb-4">Sales Report</h1>
      
//       {/* Wybór dat */}
//       <div className="d-flex justify-content-center mb-4">
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="form-control me-2"
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="form-control me-2"
//         />
//         <button
//           onClick={handleGenerateReport}
//           className="btn btn-success"
//         >
//           Generate Report
//         </button>
//       </div>

//       {error && <p className="text-center text-danger">{error}</p>}

//       {/* Wspólny wykres sprzedaży */}
//       <h3 className="text-center my-4">Overall Sales</h3>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={allSalesData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//         </LineChart>
//       </ResponsiveContainer>

//       {/* Wyszukiwarka produktów */}
//       <div className="mb-4 text-center">
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Search for a product"
//           className="form-control w-50 mx-auto"
//         />
//       </div>

//       <h3 className="text-center my-4">Sales Data Table</h3>
//       <table className="table table-striped">
//         <thead className="thead-dark">
//           <tr>
//             <th>Product Name</th>
//             <th>Total Quantity Sold</th>
//             <th>Total Revenue</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reportData.length === 0 ? (
//             <tr><td colSpan="4" className="text-center">No data available</td></tr>
//           ) : (
//             reportData.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.name}</td>
//                 <td>{row.totalQuantity}</td>
//                 <td>{row.totalRevenue}</td>
//                 <td>{row.date}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>

//       {/* Wykresy indywidualne dla każdego produktu */}
//       {filteredProducts.length > 0 ? (
//         filteredProducts.map((productName, index) => {
//           const productSalesData = products[productName];
//           return (
//             <div key={index} className="mb-5">
//               <h3 className="text-center">{productName} Sales</h3>
//               <ResponsiveContainer width="100%" height={400}>
//                 <LineChart data={productSalesData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="date" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
//                   <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           );
//         })
//       ) : (
//         <p className="text-center text-danger">No products found</p>
//       )}

//       {/* Tabela wyników */}
      
//     </div>
//   );
// };

// export default SalesReport;





import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';

const SalesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end date.');
      return;
    }

    fetch(`/api/sales-report?startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch sales report');
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data); 
        setReportData(data);
        setError('');
      })
      .catch(err => {
        console.error('Error fetching sales report:', err);
        setError('Error fetching report. Please try again.');
      });
  };

  const filteredProducts = reportData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Sales Report</h1>

      <div className="d-flex justify-content-center mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control me-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control me-2"
        />
        <button
          onClick={handleGenerateReport}
          className="btn btn-success"
        >
          Generate Report
        </button>
      </div>

      {error && <p className="text-center text-danger">{error}</p>}

      <h3 className="text-center my-4">Overall Sales</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={reportData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalQuantity" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <div className="mb-4 text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a product"
          className="form-control w-50 mx-auto"
        />
      </div>

      <h3 className="text-center my-4">Sales Data Table</h3>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Product Name</th>
            <th>Total Quantity Sold</th>
            <th>Total Revenue</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reportData.length === 0 ? (
            <tr><td colSpan="4" className="text-center">No data available</td></tr>
          ) : (
            reportData.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.totalQuantity}</td>
                <td>{row.totalRevenue}</td>
                <td>{row.sales.map(sale => sale.date).join(', ')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => {
          return (
            <div key={index} className="mb-5">
              <h3 className="text-center">{product.name} Sales</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={product.sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        })
      ) : (
        <p className="text-center text-danger">No products found</p>
      )}
    </div>
  );
};

export default SalesReport;
