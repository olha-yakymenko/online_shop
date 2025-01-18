import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { user } = useContext(UserContext);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders/user/${user.id}`);
      if (!response.ok) {
        throw new Error('Nie udało się pobrać zamówień');
      }
      const data = await response.json();
      
      if (data.message && data.message === 'Nie znaleziono zamówień dla tego użytkownika') {
        setOrders([]);
      } else {
        setOrders(data); 
        console.log(data)
      }
    } catch (error) {
      console.error('Błąd pobierania zamówień:', error);
      setError('Wystąpił problem z pobraniem zamówień. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user.id]); 

  if (loading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      <h2>Twoje Zamówienia</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {orders.length === 0 ? (
        <p>Brak zamówień dla tego użytkownika.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <div>
                <strong>Zamówienie nr {order.id}</strong> (Złożone: {new Date(order.created_at).toLocaleDateString()})
              </div>
              <div>Status: {order.status}</div>
              <div>Adres dostawy: {order.address}</div>

              <h3>Produkty:</h3>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>
                    <strong>{product}</strong>
                  </li>
                ))}
              </ul>
              <h3>Price: </h3><div>{order.price}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
