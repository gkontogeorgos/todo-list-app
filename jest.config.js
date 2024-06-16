module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@mui)/', // Adjust this regex pattern as needed
  ], //   // Jest setup
  //   moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  //   moduleNameMapper: {
  //     '^src/(.*)$': '<rootDir>/src/$1',
  //     // Add other mappings as needed
  //   },
  //   transform: {
  //     '^.+\\.(js|jsx)$': 'babel-jest',
  //     // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js', // Example path, adjust as per your project setup
  //   },
  //   // Add any other Jest configuration as needed
};
