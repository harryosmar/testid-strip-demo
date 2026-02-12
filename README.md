# test-id-remover Demo

A demonstration of using `babel-plugin-jsx-remove-data-test-id` to automatically remove data-testid attributes from React components in production builds while preserving them for development and testing.

<img width="1127" height="637" alt="image" src="https://github.com/user-attachments/assets/80faddb2-5670-4f01-8e83-1fd9bc79ff50" />


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
npm run compare
```

This command will:
1. Build the React component with test IDs preserved (development build)
2. Build the React component with test IDs removed (production build)
3. Compare both outputs to show the differences

### Expected Output

The script will display:
- The number of data-testid attributes in each build
- A snippet of code from both builds for comparison
- A success message confirming that test IDs were removed in production

## How It Works

The magic happens in the `.babelrc` configuration:

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

This configuration:
1. Applies the test-id removal plugin only in production mode
2. Preserves test IDs in development mode

## Implementation in Your Project

To implement this in your own project:

1. Install the plugin:
   ```bash
   npm install --save-dev babel-plugin-jsx-remove-data-test-id
   ```

2. Add it to your Babel configuration for production only
3. Make sure your build process sets the appropriate `BABEL_ENV` variable

This approach allows you to safely use test IDs in your code without compromising security or performance in production.

## License

ISC
