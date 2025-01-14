import React, { useState, useEffect } from 'react';
import useUsers from './hooks/useUsers';
import useMessageHandler from './hooks/useMessageHandler';

const AdminUserPanel = () => {
  const { users, addSaleCode, removeSaleCode, removeUser, fetchSaleCodes } = useUsers();
  const { message, error, setMessage, setError } = useMessageHandler();
  
  const [codes, setCodes] = useState({});

  const loadSaleCodes = async (email) => {
    try {
      console.log(email)
      const saleCodes =  await fetchSaleCodes(email);
      console.log(saleCodes)
      setCodes((prevCodes) => ({ ...prevCodes, [email]: saleCodes }));
    } catch (err) {
      setError('Failed to load sale codes');
    }
  };

  useEffect(() => {
    users.forEach((user) => {
      loadSaleCodes(user.email);
    });
  }, [users]); 

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
                    {codes[user.email] && codes[user.email].length > 0 ? (
                      codes[user.email].map((code, index) => (
                        <li key={index}>
                          {code}{" "}
                          <button onClick={() => removeSaleCode(user.email, code)}>
                            Remove
                          </button>
                        </li>
                      ))
                    ) : (
                      <p>No sale codes</p>
                    )}
                  </ul>
                </td>
                <td>
                  <button onClick={() => addSaleCode(user.email)}>Add Sale Code</button>
                  <button onClick={() => removeUser(user.email)} style={{ color: 'white' }}>
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
