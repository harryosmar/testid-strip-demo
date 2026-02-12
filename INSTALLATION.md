# Installation Guide for test-id-remover Demo

This guide walks through creating this project step by step from scratch.

## Prerequisites

- Node.js and npm installed
- Basic knowledge of React and Babel

## Step 1: Initialize the Project

Create a new directory and initialize a new npm project:

```bash
mkdir test-id-remover
cd test-id-remover
npm init -y
```

## Step 2: Install Required Dependencies

Install Babel core, CLI, and presets:

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
```

Install React dependencies:

```bash
npm install --save react react-dom
```

Install the test-id removal plugin:

```bash
npm install --save-dev babel-plugin-jsx-remove-data-test-id
```

## Step 3: Configure Babel

Create a `.babelrc` file with environment-specific configurations:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "env": {
    "development": {
      "plugins": []
    },
    "production": {
      "plugins": ["babel-plugin-jsx-remove-data-test-id"]
    }
  }
}
```

## Step 4: Set Up Project Structure

Create the source directory and files:

```bash
mkdir -p src scripts
```

## Step 5: Create React Component with test-ids

Create `src/App.jsx` with data-testid attributes:

```jsx
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
```

## Step 6: Create Entry Point

Create `src/index.js`:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

## Step 7: Create Comparison Script

Create `scripts/compare.js` to visualize the differences:

```javascript
const fs = require('fs');
const path = require('path');

// Paths to the generated files
const devPath = path.join(__dirname, '..', 'dist', 'dev', 'App.js');
const prodPath = path.join(__dirname, '..', 'dist', 'prod', 'App.js');

// Read the content of both files
const devContent = fs.readFileSync(devPath, 'utf8');
const prodContent = fs.readFileSync(prodPath, 'utf8');

// Count occurrences of data-testid in each file
const countDataTestId = (content) => {
  const regex = /data-testid/g;
  const matches = content.match(regex);
  return matches ? matches.length : 0;
};

const devCount = countDataTestId(devContent);
const prodCount = countDataTestId(prodContent);

console.log('\n=== TEST-ID REMOVAL COMPARISON ===\n');
console.log(`DEVELOPMENT BUILD: ${devCount} data-testid attributes found`);
console.log(`PRODUCTION BUILD: ${prodCount} data-testid attributes found`);
console.log('\n=== DEVELOPMENT VERSION (with test IDs) ===\n');
console.log(devContent.slice(0, 500) + '...\n');
console.log('\n=== PRODUCTION VERSION (without test IDs) ===\n');
console.log(prodContent.slice(0, 500) + '...\n');

if (prodCount === 0 && devCount > 0) {
  console.log('✅ SUCCESS: All data-testid attributes were removed from the production build!');
} else if (prodCount < devCount) {
  console.log('⚠️ WARNING: Some data-testid attributes were removed, but not all of them.');
} else {
  console.log('❌ ERROR: No data-testid attributes were removed from the production build.');
}
```

## Step 8: Update package.json Scripts

Add build scripts to your package.json:

```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "build:dev": "BABEL_ENV=development babel src --out-dir dist/dev --extensions '.jsx,.js' --copy-files",
  "build:prod": "BABEL_ENV=production babel src --out-dir dist/prod --extensions '.jsx,.js' --copy-files",
  "compare": "npm run build:dev && npm run build:prod && node scripts/compare.js"
}
```

That's it! Your project is now set up to demonstrate how the `babel-plugin-jsx-remove-data-test-id` works.
