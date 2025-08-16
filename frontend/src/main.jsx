import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/components/ChatPage'; // We will create the real one next
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // This makes AuthPage the default route
        element: <AuthPage />,
      },
      {
        path: 'chat',
        element: <ChatPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);