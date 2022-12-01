import { React, useContext, useState, createContext } from 'react';

const MessageContext = createContext();

export function useMessageContext() {
  return useContext(MessageContext);
}

export function MessageContextProvider({ children }) {
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);

  return (
    <MessageContext.Provider
      value={{ message, setMessage, success, setSuccess, showToast, setShowToast }}
    >
      {children}
    </MessageContext.Provider>
  );
}
