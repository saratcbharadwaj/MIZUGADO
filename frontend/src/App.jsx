import React from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  // The Outlet component will render either AuthPage or ChatPage
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;