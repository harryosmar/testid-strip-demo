# test-id-remover

A utility that automatically removes test-id attributes in production builds while preserving them in development for testing purposes, using a simple helper function.

## Overview

This project demonstrates how to:
- Keep test IDs in development/testing environments for automated testing
- Automatically remove test IDs in production builds for security and performance
- Use environment-specific Babel configurations

## Why Remove Test IDs in Production?

Including test IDs in production violates security principles:
- **Information Leakage**: Exposes internal structure and naming conventions
- **Attack Surface Reduction**: Provides additional identifiers attackers can target
- **Unnecessary Features**: Production code should contain only features needed for operation
- **Performance**: Reduces DOM size and parsing time

## Installation

```bash
# Clone the repository
git clone https://github.com/harryosmar/test-id-remover.git
cd test-id-remover

# Install dependencies
npm install
```

For detailed step-by-step instructions on creating this project from scratch, see [INSTALLATION.md](./INSTALLATION.md).

## Running the Demo

To see the demonstration in action, run:

```bash
# Build the development version (with test IDs)
npm run build:dev

# Build the production version (without test IDs)
npm run build:prod
```

Examine the compiled output in the `dist/dev` and `dist/prod` directories to see the difference.

## How It Works

The magic happens in the `testIdHelper` function:

```javascript
export const testIdHelper = (paramId) => {
  if (process.env.NODE_ENV === 'production') {
    // In production: return empty string
    return '';
  }
  
  // In development/test: return the parameter directly
  return paramId;
};
```

This simple helper function:
1. Checks the current environment via `process.env.NODE_ENV`
2. In production: Returns an empty string, effectively removing the test ID
3. In development: Returns the original parameter, preserving the test ID for testing

The `babel.config.js` file ensures that `process.env.NODE_ENV` is correctly replaced during the build process:

```javascript
module.exports = function(api) {
  api.cache(true);
  
  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-react"
    ],
    plugins: [
      ["transform-define", {
        "process.env.NODE_ENV": process.env.NODE_ENV || "development"
      }]
    ]
  };
};
```

## Implementation in Your Project

To implement this in your own project:

1. Create the testIdHelper utility function:

   ```javascript
   // src/utils/testid-helper.js
   export const testIdHelper = (paramId) => {
     if (process.env.NODE_ENV === 'production') {
       // In production: return empty string
       return '';
     }
     
     // In development/test: return the parameter directly
     return paramId;
   };
   ```

2. Configure Babel to replace process.env.NODE_ENV at build time:

   ```bash
   npm install --save-dev babel-plugin-transform-define
   ```

   ```javascript
   // babel.config.js
   module.exports = function(api) {
     api.cache(true);
     
     return {
       presets: [/* your presets */],
       plugins: [
         ["transform-define", {
           "process.env.NODE_ENV": process.env.NODE_ENV || "development"
         }]
       ]
     };
   };
   ```

3. Use the helper in your React components:

   ```jsx
   import { testIdHelper } from './utils/testid-helper';
   
   function MyComponent() {
     return (
       <div data-testid={testIdHelper("container")}>
         <button data-testid={testIdHelper("submit-button")}>Submit</button>
       </div>
     );
   }
   ```

4. Set up your build scripts in package.json:

   ```json
   "scripts": {
     "build:dev": "NODE_ENV=development babel src --out-dir dist/dev",
     "build:prod": "NODE_ENV=production babel src --out-dir dist/prod"
   }
   ```

This approach allows you to keep test IDs in development/test environments for testing, while automatically removing them in production builds for security and better performance.

## License

ISC
