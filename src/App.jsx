import React from 'react';

const App = () => {
  return (
    <div data-testid="app-container">
      <h1 data-testid="app-title">Test ID Remover Demo</h1>
      <form data-testid="login-form">
        <input 
          data-testid="username-input"
          type="text" 
          placeholder="Username" 
        />
        <input 
          data-testid="password-input"
          type="password" 
          placeholder="Password" 
        />
        <button data-testid="submit-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default App;
