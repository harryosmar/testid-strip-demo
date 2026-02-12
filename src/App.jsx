import React from 'react';
import { testIdHelper } from './utils/testid-helper';

function App() {
  return (
    <div data-testid={testIdHelper("app-container")}>
      <header data-testid={testIdHelper("app-header")}>
        <h1 data-testid={testIdHelper("app-title")}>Test ID Remover Demo</h1>
        <p data-testid={testIdHelper("app-description")}>
          This demo shows how test IDs are preserved in development but removed in production.
        </p>
      </header>
      
      <main data-testid={testIdHelper("main-content")}>
        <form data-testid={testIdHelper("login-form")}>
          <div data-testid={testIdHelper("form-field")}>
            <label 
              htmlFor="username"
              data-testid={testIdHelper("username-label")}
            >
              Username
            </label>
            <input 
              id="username"
              type="text" 
              placeholder="Enter username" 
              data-testid={testIdHelper("username-input")} 
            />
          </div>
          
          <div data-testid={testIdHelper("form-field")}>
            <label 
              htmlFor="password"
              data-testid={testIdHelper("password-label")}
            >
              Password
            </label>
            <input 
              id="password"
              type="password" 
              placeholder="Enter password" 
              data-testid={testIdHelper("password-input")} 
            />
          </div>
          
          <button 
            type="submit" 
            data-testid={testIdHelper("submit-button")}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
