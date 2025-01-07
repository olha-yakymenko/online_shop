import React, { useState, useEffect } from 'react';

const AdminUserPanel = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5055/get-users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    }
  };

  const addSaleCode = async (email) => {
    try {
      const response = await fetch('http://localhost:5055/add-sale-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Sale code added for ${email}: ${data.saleCode}`);
        fetchUsers();  
      } else {
        setError(data.message || 'Failed to add sale code.');
      }
    } catch (err) {
      console.error("Error adding sale code:", err);
      setError("Failed to add sale code.");
    }
  };

  const removeSaleCode = async (email, saleCode) => {
    try {
      const response = await fetch('http://localhost:5055/remove-sale-code', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, saleCode })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Sale code ${saleCode} removed for ${email}`);
        fetchUsers();  
      } else {
        setError(data.message || 'Failed to remove sale code.');
      }
    } catch (err) {
      console.error("Error removing sale code:", err);
      setError("Failed to remove sale code.");
    }
  };

  const removeUser = async (email) => {
    try {
      const response = await fetch('http://localhost:5055/remove-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`User ${email} removed`);
        fetchUsers();  
      } else {
        setError(data.message || 'Failed to remove user.');
      }
    } catch (err) {
      console.error("Error removing user:", err);
      setError("Failed to remove user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-panel">
      <h1>Administrator Panel</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Sale Codes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                  <ul>
                    {user.sale && user.sale.length > 0 ? (
                      user.sale.map((code, index) => (
                        <li key={index}>
                          {code}{" "}
                          <button onClick={() => removeSaleCode(user.email, code)}>Remove</button>
                        </li>
                      ))
                    ) : (
                      <p>No sale codes</p>
                    )}
                  </ul>
                </td>
                <td>
                  <button onClick={() => addSaleCode(user.email)}>Add Sale Code</button>
                  <button onClick={() => removeUser(user.email)} style={{ marginLeft: '10px' }}>
                    Remove User
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserPanel;
