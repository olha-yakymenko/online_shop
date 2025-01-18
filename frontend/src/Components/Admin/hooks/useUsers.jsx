// import { useState, useEffect } from 'react';

// const useUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [saleCodes, setSaleCodes] = useState([]);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch('http://localhost:5055/get-users');
//       const data = await response.json();
//       setUsers(data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       setError("Failed to fetch users.");
//     }
//   };

//   const addSaleCode = async (email) => {
//     try {
//       const response = await fetch('http://localhost:5055/add-sale-code', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`Sale code added for ${email}: ${data.saleCode}`);
//         fetchUsers();
//       } else {
//         setError(data.message || 'Failed to add sale code.');
//       }
//     } catch (err) {
//       console.error("Error adding sale code:", err);
//       setError("Failed to add sale code.");
//     }
//   };

//   const removeSaleCode = async (email, saleCode) => {
//     try {
//       const response = await fetch('http://localhost:5055/remove-sale-code', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, saleCode }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`Sale code ${saleCode} removed for ${email}`);
//         fetchUsers();
//       } else {
//         setError(data.message || 'Failed to remove sale code.');
//       }
//     } catch (err) {
//       console.error("Error removing sale code:", err);
//       setError("Failed to remove sale code.");
//     }
//   };

//   const removeUser = async (email) => {
//     try {
//       const response = await fetch('http://localhost:5055/delete-user', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setMessage(`User ${email} removed`);
//         fetchUsers();
//       } else {
//         setError(data.message || 'Failed to remove user.');
//       }
//     } catch (err) {
//       console.error("Error removing user:", err);
//       setError("Failed to remove user.");
//     }
//   };

//   const fetchSaleCodes = async (email) => {
//     try {
//         const response = await fetch(`http://localhost:5055/get-sale-codes?email=${email}`);
//         const data = await response.json();
//         console.log(data)
//         if (response.ok) {
//           return data.saleCodes || [];
//         } else {
//             setError(data.message || 'Failed to fetch sale codes');
//             return [];
//         }
//       } catch (err) {
//         console.error('Error fetching sale codes:', err);
//         setError('Error fetching sale codes');
//         return [];
//       } 
//     };
  


//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return {
//     users,
//     saleCodes,
//     message,
//     error,
//     addSaleCode,
//     removeSaleCode,
//     removeUser,
//     fetchSaleCodes,
//     setError,
//     setMessage,
//   };
// };

// export default useUsers;



import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const useUsers = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5055/get-users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };

  const { data: users, refetch: refetchUsers } = useQuery('users', fetchUsers, {
    onError: (err) => setError(err.message),
    refetchOnWindowFocus: false, // Optional: To avoid refetching on window focus
  });

  const addSaleCodeMutation = useMutation(
    async (email) => {
      const response = await fetch('http://localhost:5055/add-sale-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add sale code');
      }
      return response.json();
    },
    {
      onSuccess: (data, email) => {
        setMessage(`Sale code added for ${email}: ${data.saleCode}`);
        queryClient.invalidateQueries('users', { exact: true });
        queryClient.refetchQueries('users', { exact: true });
      },
      onError: (err) => setError(err.message),
    }
  );

  const removeSaleCodeMutation = useMutation(
    async ({ email, saleCode }) => {
      const response = await fetch('http://localhost:5055/remove-sale-code', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, saleCode }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove sale code');
      }
      return response.json();
    },
    {
      onSuccess: (data, { email, saleCode }) => {
        setMessage(`Sale code ${saleCode} removed for ${email}`);
        queryClient.invalidateQueries('users', { exact: true });
        queryClient.refetchQueries('users', { exact: true });
      },
      onError: (err) => setError(err.message),
    }
  );

  const removeUserMutation = useMutation(
    async (email) => {
      const response = await fetch('http://localhost:5055/delete-user', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove user');
      }
      return response.json();
    },
    {
      onSuccess: (data, email) => {
        setMessage(`User ${email} removed`);
        queryClient.invalidateQueries('users', { exact: true });
        queryClient.refetchQueries('users', { exact: true });
      },
      onError: (err) => setError(err.message),
    }
  );

  const fetchSaleCodes = async (email) => {
    const response = await fetch(`http://localhost:5055/get-sale-codes?email=${email}`);
    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message || 'Failed to fetch sale codes');
      return [];
    }
    const data = await response.json();
    return data.saleCodes || [];
  };

  return {
    users: users || [],
    saleCodes: [],
    message,
    error,
    addSaleCode: addSaleCodeMutation.mutate,
    removeSaleCode: removeSaleCodeMutation.mutate,
    removeUser: removeUserMutation.mutate,
    fetchSaleCodes,
    setError,
    setMessage,
  };
};

export default useUsers;
