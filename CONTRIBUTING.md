# Contributing to GCam Ports NPM Package

Thank you for your interest in contributing to the GCam Ports NPM package! This document provides guidelines and information for contributors.

## 🚀 How to Contribute

### Reporting Issues

1. **Search existing issues** first to avoid duplicates
2. **Use descriptive titles** that clearly explain the problem
3. **Provide detailed information** including:
   - Package version
   - Node.js version
   - Operating system
   - Steps to reproduce
   - Expected vs actual behavior
   - Error messages (if any)

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Clearly describe the feature** and its use case
3. **Explain why it would be beneficial** to the community
4. **Provide examples** of how it would be used

### Code Contributions

#### Development Setup

```bash
# Fork the repository on GitHub
git clone https://github.com/your-username/gcam-ports-npm.git
cd gcam-ports-npm

# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Run examples
npm start
```

#### Making Changes

1. **Create a feature branch** from main:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards:

   - Use meaningful variable and function names
   - Add JSDoc comments for public methods
   - Follow existing code style and patterns
   - Keep functions small and focused

3. **Add or update tests** for your changes:

   - Unit tests for new functions
   - Integration tests for API changes
   - Ensure all tests pass: `npm test`

4. **Update documentation** as needed:

   - Update README.md for new features
   - Add JSDoc comments
   - Update TypeScript definitions

5. **Commit your changes** with descriptive messages:

   ```bash
   git add .
   git commit -m "feat: add device filtering by processor type"
   ```

6. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

#### Commit Message Guidelines

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `test:` - Adding or updating tests
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `chore:` - Maintenance tasks

Examples:

```
feat: add search by processor type
fix: handle empty search queries gracefully
docs: update API documentation with examples
test: add unit tests for device search
```

## 📋 Code Standards

### JavaScript Style

- Use ES6+ features where appropriate
- Use `const` for constants, `let` for variables
- Use template literals for string interpolation
- Use destructuring for object/array extraction
- Use arrow functions for short functions
- Use async/await instead of callbacks

### Error Handling

- Always handle errors gracefully
- Provide meaningful error messages
- Use try-catch blocks for async operations
- Validate input parameters

Example:

```javascript
async function fetchLiveDevices(brand) {
  if (!brand || typeof brand !== "string") {
    throw new Error("Brand must be a non-empty string");
  }

  try {
    // Implementation
  } catch (error) {
    throw new Error(`Failed to fetch devices for ${brand}: ${error.message}`);
  }
}
```

### Testing

- Write unit tests for all public methods
- Test edge cases and error conditions
- Use descriptive test names
- Group related tests using `describe` blocks
- Mock external dependencies

Example:

```javascript
describe("GCamPorts.searchDevices", () => {
  test("should find devices with matching names", () => {
    // Test implementation
  });

  test("should return empty array for non-existent devices", () => {
    // Test implementation
  });

  test("should handle case-insensitive search", () => {
    // Test implementation
  });
});
```

## 📦 Package Structure

```
gcam-ports/
├── index.js              # Main entry point
├── src/
│   └── GCamPorts.js      # Main class implementation
├── data/
│   ├── brands.json       # Brands database
│   └── devices.json      # Devices database
├── examples/
│   └── basic-usage.js    # Usage examples
├── tests/
│   └── gcam-ports.test.js # Test suite
├── index.d.ts            # TypeScript definitions
├── package.json
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## 🔄 Data Updates

### Adding New Brands

1. Update `data/brands.json` with brand information:

```json
{
  "newbrand": {
    "name": "New Brand",
    "url": "https://gcam-ports.com/download-gcam-ports-for-newbrand-phones/",
    "description": "GCam ports for New Brand devices",
    "processor_types": ["Snapdragon", "MediaTek"],
    "popular_series": ["Series A", "Series B"]
  }
}
```

2. Add devices to `data/devices.json`:

```json
{
  "newbrand": [
    {
      "name": "New Brand Device X",
      "model": "NBX-001",
      "url": "https://gcam-ports.com/newbrand/device-x-google-camera/",
      "processor": "Snapdragon 8 Gen 3",
      "android_version": "14",
      "release_year": 2024
    }
  ]
}
```

3. Update tests and documentation
4. Verify all existing functionality still works

### Adding New Devices

1. Add device entries to appropriate brand in `data/devices.json`
2. Ensure all required fields are present
3. Follow naming conventions for consistency
4. Update tests if needed

## 🧪 Testing Guidelines

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- tests/gcam-ports.test.js
```

### Test Categories

1. **Unit Tests**: Test individual functions in isolation
2. **Integration Tests**: Test component interactions
3. **Data Validation Tests**: Ensure data integrity
4. **Error Handling Tests**: Test error conditions

### Writing Tests

- Use Jest testing framework
- Write clear, descriptive test names
- Test both success and failure scenarios
- Use appropriate assertions
- Mock external dependencies

## 📚 Documentation

### API Documentation

- Use JSDoc comments for all public methods
- Include parameter types and descriptions
- Provide usage examples
- Document return values and exceptions

Example:

```javascript
/**
 * Search for devices across all brands
 * @param {string} query - Search query (device name or model)
 * @returns {Array<DeviceSearchResult>} Array of matching devices with brand info
 * @throws {Error} When query is invalid
 * @example
 * const results = gcamPorts.searchDevices('Galaxy S25');
 * console.log(results); // [{ name: 'Samsung Galaxy S25', brand: 'samsung', ... }]
 */
searchDevices(query) {
  // Implementation
}
```

### README Updates

- Keep examples up to date
- Update feature lists when adding functionality
- Include performance characteristics
- Update compatibility information

## 🚢 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- `MAJOR.MINOR.PATCH`
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)

### Release Checklist

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Ensure all tests pass
4. Update documentation
5. Create GitHub release
6. Publish to NPM

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

### Communication

- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for questions and general discussion
- Be patient and helpful with responses
- Provide context and examples when asking questions

## 🎯 Contribution Ideas

### Good First Issues

- Fix typos in documentation
- Add more device entries to the database
- Improve error messages
- Add more usage examples
- Write additional tests

### Advanced Contributions

- Performance optimizations
- New search algorithms
- Additional data sources integration
- CLI tool enhancements
- Web scraping improvements

## 📞 Getting Help

If you need help with contributing:

1. Check existing documentation
2. Search GitHub Issues and Discussions
3. Create a new GitHub Issue with the "question" label
4. Join our community discussions

## 🙏 Recognition

Contributors will be:

- Listed in the CONTRIBUTORS.md file
- Mentioned in release notes
- Credited in the package.json contributors field

Thank you for helping make the GCam Ports NPM package better for everyone!

---

**Questions?** Feel free to reach out through GitHub Issues or visit [gcam-ports.com](https://gcam-ports.com) for more information.
