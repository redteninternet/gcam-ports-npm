# GCam Ports NPM Package

[![npm version](https://img.shields.io/npm/v/gcam-ports.svg)](https://www.npmjs.com/package/gcam-ports)
[![npm downloads](https://img.shields.io/npm/dt/gcam-ports.svg)](https://www.npmjs.com/package/gcam-ports)
[![license](https://img.shields.io/npm/l/gcam-ports.svg)](https://github.com/redteninternet/gcam-ports-npm/blob/main/LICENSE)

A comprehensive Node.js package providing easy access to Google Camera (GCam) ports for various Android device brands. This package serves as a programmatic interface to the extensive GCam ports database available at [gcam-ports.com](https://gcam-ports.com).

## 🚀 Features

- **12+ Supported Brands**: Samsung, OnePlus, Xiaomi/Redmi/POCO, Realme, Vivo, OPPO, Motorola, Nothing, Infinix, Tecno, ASUS, Honor
- **Comprehensive Device Database**: Access to hundreds of compatible Android devices
- **Live Data Fetching**: Fetch real-time device information from gcam-ports.com
- **Search Functionality**: Search devices across all brands
- **TypeScript Support**: Full TypeScript definitions included
- **Lightweight**: Minimal dependencies with efficient performance
- **Regular Updates**: Synchronized with the latest GCam ports releases

## 📱 What is GCam?

Google Camera (GCam) is Google's advanced camera application featuring computational photography capabilities like Night Sight, Portrait Mode, and HDR+. Originally exclusive to Pixel devices, talented developers have created modified versions (ports) that work on various Android smartphones, significantly enhancing photo quality.

## 🛠 Installation

```bash
npm install gcam-ports
```

or

```bash
yarn add gcam-ports
```

## 📖 Quick Start

```javascript
const {
  GCamPorts,
  getSupportedBrands,
  getDevicesByBrand,
} = require("gcam-ports");

// Create an instance
const gcamPorts = new GCamPorts();

// Get all supported brands
console.log(getSupportedBrands());

// Get devices for Samsung
const samsungDevices = getDevicesByBrand("samsung");
console.log(samsungDevices);

// Search for specific devices
const results = gcamPorts.searchDevices("Galaxy S25");
console.log(results);
```

## 🔧 API Reference

### Main Class: GCamPorts

#### Constructor

```javascript
const gcamPorts = new GCamPorts(options);
```

**Options:**

- `timeout` (number): HTTP request timeout in milliseconds (default: 5000)
- `userAgent` (string): Custom user agent for requests

#### Methods

##### `getSupportedBrands()`

Returns an object containing all supported brands with their information.

```javascript
const brands = gcamPorts.getSupportedBrands();
// Returns: { samsung: { name: "Samsung", url: "...", ... }, ... }
```

##### `getDevicesByBrand(brand)`

Get all devices for a specific brand.

```javascript
const devices = gcamPorts.getDevicesByBrand("samsung");
// Returns: [{ name: "Samsung Galaxy S25", model: "SM-S931U", ... }, ...]
```

##### `searchDevices(query)`

Search for devices across all brands.

```javascript
const results = gcamPorts.searchDevices("Galaxy S25");
// Returns: [{ name: "Samsung Galaxy S25", brand: "samsung", ... }, ...]
```

##### `getDownloadUrl(brand)`

Get the download page URL for a specific brand.

```javascript
const url = gcamPorts.getDownloadUrl("oneplus");
// Returns: "https://gcam-ports.com/download-gcam-ports-for-oneplus-phones/"
```

##### `isBrandSupported(brand)`

Check if a brand is supported.

```javascript
const isSupported = gcamPorts.isBrandSupported("samsung");
// Returns: true
```

##### `getBrandInfo(brand)`

Get detailed information about a brand.

```javascript
const info = gcamPorts.getBrandInfo("samsung");
// Returns: { name: "Samsung", description: "...", processor_types: [...], ... }
```

##### `getDeviceCount(brand)`

Get the number of supported devices for a brand.

```javascript
const count = gcamPorts.getDeviceCount("samsung");
// Returns: 95 (example)
```

##### `getTotalDeviceCount()`

Get the total number of supported devices across all brands.

```javascript
const total = gcamPorts.getTotalDeviceCount();
// Returns: 500+ (example)
```

##### `generateDeviceUrl(brand, deviceModel)`

Generate a direct URL for a specific device's GCam page.

```javascript
const url = gcamPorts.generateDeviceUrl("samsung", "Galaxy S25");
// Returns: "https://gcam-ports.com/samsung/galaxy-s25-google-camera/"
```

##### `getStats()`

Get comprehensive statistics about the GCam ports database.

```javascript
const stats = gcamPorts.getStats();
// Returns: { totalBrands: 12, totalDevices: 500+, devicesByBrand: {...}, ... }
```

##### `fetchLiveDevices(brand)` (Async)

Fetch real-time device data from gcam-ports.com (requires internet connection).

```javascript
try {
  const liveDevices = await gcamPorts.fetchLiveDevices("samsung");
  console.log(liveDevices);
} catch (error) {
  console.error("Failed to fetch live data:", error.message);
}
```

### Quick Access Functions

```javascript
const {
  getSupportedBrands,
  getDevicesByBrand,
  getDownloadUrl,
} = require("gcam-ports");

// Get all brands
const brands = getSupportedBrands();

// Get devices for a specific brand
const devices = getDevicesByBrand("oneplus");

// Get download URL
const url = getDownloadUrl("xiaomi");
```

## 📱 Supported Brands

| Brand                 | Devices | Processor Types              | Popular Series              |
| --------------------- | ------- | ---------------------------- | --------------------------- |
| **Samsung**           | 95+     | Exynos, Snapdragon           | Galaxy S, Note, A, M, F     |
| **OnePlus**           | 70+     | Snapdragon                   | OnePlus, Nord, Ace          |
| **Xiaomi/Redmi/POCO** | 80+     | Snapdragon, MediaTek         | Mi, Redmi, POCO, Note       |
| **Realme**            | 60+     | MediaTek, Snapdragon         | GT, C, Narzo                |
| **Vivo**              | 55+     | Snapdragon, MediaTek, Exynos | V, Y, X, S                  |
| **OPPO**              | 50+     | Snapdragon, MediaTek         | Find, Reno, A, F            |
| **Motorola**          | 45+     | Snapdragon, MediaTek         | Moto G, Edge, One, E        |
| **Nothing**           | 5+      | Snapdragon                   | Nothing Phone               |
| **Infinix**           | 35+     | MediaTek, UNISOC             | Note, Hot, Zero, Smart      |
| **Tecno**             | 30+     | MediaTek, UNISOC             | Camon, Spark, Phantom, Pova |
| **ASUS**              | 15+     | Snapdragon, MediaTek         | ROG Phone, ZenFone          |
| **Honor**             | 25+     | Snapdragon, MediaTek, Kirin  | Magic, X, Play              |

## 🎯 Use Cases

### Mobile App Development

```javascript
// Build a GCam port finder app
const gcamPorts = new GCamPorts();

function findGCamForDevice(userDevice) {
  const results = gcamPorts.searchDevices(userDevice);
  return results.length > 0 ? results[0].url : null;
}
```

### Web Development

```javascript
// Create a device compatibility checker
app.get("/api/compatibility/:brand/:model", (req, res) => {
  const { brand, model } = req.params;
  const devices = gcamPorts.getDevicesByBrand(brand);
  const compatible = devices.find((d) => d.name.includes(model));

  res.json({ compatible: !!compatible, device: compatible });
});
```

### Data Analysis

```javascript
// Analyze GCam port statistics
const stats = gcamPorts.getStats();
console.log(
  `Coverage: ${stats.totalDevices} devices across ${stats.totalBrands} brands`
);

// Find most supported brand
const topBrand = Object.entries(stats.devicesByBrand).sort(
  ([, a], [, b]) => b - a
)[0];
console.log(`Most supported: ${topBrand[0]} with ${topBrand[1]} devices`);
```

### CLI Tools

```javascript
#!/usr/bin/env node
const { program } = require("commander");
const { GCamPorts } = require("gcam-ports");

program
  .command("search <device>")
  .description("Search for GCam ports")
  .action((device) => {
    const gcamPorts = new GCamPorts();
    const results = gcamPorts.searchDevices(device);
    console.table(results);
  });

program.parse();
```

## 🔄 Live Data vs Static Data

The package includes a static database for offline use, but also supports fetching live data:

- **Static Data**: Fast, reliable, works offline - included in the package
- **Live Data**: Real-time information from gcam-ports.com - requires internet connection

```javascript
// Static data (recommended for most use cases)
const devices = gcamPorts.getDevicesByBrand("samsung");

// Live data (for real-time applications)
const liveDevices = await gcamPorts.fetchLiveDevices("samsung");
```

## ⚡ Performance

- **Lightweight**: < 50KB package size
- **Fast**: Local database queries execute in < 1ms
- **Efficient**: Minimal memory footprint
- **Cached**: HTTP requests are optimized with proper caching

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/redteninternet/gcam-ports-npm.git
cd gcam-ports-npm
npm install
npm test
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🌐 Related Links

- **Website**: [gcam-ports.com](https://gcam-ports.com) - The official GCam ports repository
- **GitHub**: [gcam-ports-npm](https://github.com/redteninternet/gcam-ports-npm)
- **NPM**: [gcam-ports](https://www.npmjs.com/package/gcam-ports)
- **Issues**: [Report bugs or request features](https://github.com/redteninternet/gcam-ports-npm/issues)

## 💝 Support

If this package helps your project, please consider:

- ⭐ Starring the [GitHub repository](https://github.com/redteninternet/gcam-ports-npm)
- 🐛 Reporting bugs or suggesting features
- 📢 Sharing with other developers
- 💰 Supporting the [gcam-ports.com](https://gcam-ports.com) project

## 📊 Package Stats

- **Total Brands Supported**: 12+
- **Total Devices**: 500+
- **Package Size**: < 50KB
- **Dependencies**: 2 (axios, cheerio)
- **Node.js Compatibility**: 12.0.0+

---

**Made with ❤️ by the GCam Ports team**

Visit [gcam-ports.com](https://gcam-ports.com) for the latest GCam ports and comprehensive device guides!
