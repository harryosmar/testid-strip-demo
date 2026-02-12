/**
 * Test ID Helper Function
 * 
 * Returns an empty string in production environment
 * Returns the original parameter directly in all other environments
 * 
 * @param {string} paramId - The test ID parameter
 * @returns {string} - Empty string in production, or the original paramId in other environments
 */

/**
 * Determine if the current environment is production
 * @returns {boolean} - true if production, false otherwise
 */
const isProduction = () => {
  // Check for production environment
  // This can be configured based on your build system
  return process.env.NODE_ENV === 'production';
};

/**
 * Helper function for test IDs
 * Returns the original parameter in non-production environments
 * Returns an empty string in production environment
 * 
 * @param {string} paramId - The ID to use for testing
 * @returns {string} - Either the original paramId or '' based on environment
 */
export const testIdHelper = (paramId) => {
  if (isProduction()) {
    // In production: return empty string
    return '';
  }
  
  // In development/test: return the parameter directly
  return paramId;
};
