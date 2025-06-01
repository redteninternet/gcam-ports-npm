// Jest setup file for GCam Ports tests

// Set test timeout for all tests
jest.setTimeout(10000);

// Mock console methods for cleaner test output
global.console = {
  ...console,
  // Uncomment to suppress console.log during tests
  // log: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Global test utilities
global.testUtils = {
  // Helper to create mock HTTP responses
  createMockResponse: (data, status = 200) => ({
    data,
    status,
    statusText: status === 200 ? "OK" : "Error",
  }),

  // Helper to create mock devices
  createMockDevice: (overrides = {}) => ({
    name: "Test Device",
    model: "TEST-001",
    url: "https://gcam-ports.com/test/test-device-google-camera/",
    processor: "Snapdragon 8 Gen 3",
    android_version: "14",
    release_year: 2024,
    ...overrides,
  }),

  // Helper to create mock brand info
  createMockBrand: (overrides = {}) => ({
    name: "Test Brand",
    url: "https://gcam-ports.com/download-gcam-ports-for-test-phones/",
    description: "Test brand for unit testing",
    processor_types: ["Snapdragon"],
    popular_series: ["Test Series"],
    ...overrides,
  }),
};

// Setup environment variables for tests
process.env.NODE_ENV = "test";

// Suppress specific warnings during tests
const originalWarn = console.warn;
console.warn = (...args) => {
  // Suppress axios warnings during tests
  if (args[0] && args[0].includes && args[0].includes("axios")) {
    return;
  }
  originalWarn.apply(console, args);
};

// Global error handler for unhandled promises
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Clean up after tests
afterEach(() => {
  // Clear all mocks after each test
  jest.clearAllMocks();
});
