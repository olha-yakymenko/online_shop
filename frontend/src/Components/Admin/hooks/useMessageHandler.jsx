import { useState } from 'react';

const useMessageHandler = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const clearMessages = () => {
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  return {
    message,
    error,
    setMessage: (msg) => {
      setMessage(msg);
      clearMessages();
    },
    setError: (err) => {
      setError(err);
      clearMessages();
    },
  };
};

export default useMessageHandler;
