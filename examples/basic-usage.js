const {
  GCamPorts,
  getSupportedBrands,
  getDevicesByBrand,
} = require("../index");

// Create a new instance
const gcamPorts = new GCamPorts();

console.log("=== GCam Ports NPM Package Examples ===\n");

// Example 1: Get all supported brands
console.log("1. Supported Brands:");
const brands = getSupportedBrands();
Object.keys(brands).forEach((brand) => {
  console.log(
    `   - ${brands[brand].name} (${gcamPorts.getDeviceCount(brand)} devices)`
  );
});
console.log();

// Example 2: Get devices for a specific brand
console.log("2. Samsung Devices (first 5):");
const samsungDevices = getDevicesByBrand("samsung");
samsungDevices.slice(0, 5).forEach((device) => {
  console.log(`   - ${device.name} (${device.processor})`);
});
console.log();

// Example 3: Search for specific devices
console.log('3. Search Results for "Galaxy S25":');
const searchResults = gcamPorts.searchDevices("Galaxy S25");
searchResults.forEach((device) => {
  console.log(`   - ${device.name} (${device.brand.toUpperCase()})`);
});
console.log();

// Example 4: Get download URL for a brand
console.log("4. Download URLs:");
console.log(`   - OnePlus: ${gcamPorts.getDownloadUrl("oneplus")}`);
console.log(`   - Xiaomi: ${gcamPorts.getDownloadUrl("xiaomi")}`);
console.log();

// Example 5: Get statistics
console.log("5. Package Statistics:");
const stats = gcamPorts.getStats();
console.log(`   - Total Brands: ${stats.totalBrands}`);
console.log(`   - Total Devices: ${stats.totalDevices}`);
console.log(`   - Top 3 Brands by Device Count:`);
const sortedBrands = Object.entries(stats.devicesByBrand)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 3);
sortedBrands.forEach(([brand, count]) => {
  console.log(`     • ${brand}: ${count} devices`);
});
console.log();

// Example 6: Generate device URL
console.log("6. Generated Device URLs:");
console.log(
  `   - Samsung Galaxy S25: ${gcamPorts.generateDeviceUrl(
    "samsung",
    "Galaxy S25"
  )}`
);
console.log(
  `   - OnePlus 13: ${gcamPorts.generateDeviceUrl("oneplus", "OnePlus 13")}`
);
console.log();

// Example 7: Check brand support
console.log("7. Brand Support Check:");
console.log(
  `   - Is Samsung supported? ${gcamPorts.isBrandSupported("samsung")}`
);
console.log(`   - Is Apple supported? ${gcamPorts.isBrandSupported("apple")}`);
console.log();

// Example 8: Get brand information
console.log("8. Brand Information - OnePlus:");
const onePlusInfo = gcamPorts.getBrandInfo("oneplus");
if (onePlusInfo) {
  console.log(`   - Name: ${onePlusInfo.name}`);
  console.log(`   - Description: ${onePlusInfo.description}`);
  console.log(
    `   - Processor Types: ${onePlusInfo.processor_types.join(", ")}`
  );
  console.log(`   - Popular Series: ${onePlusInfo.popular_series.join(", ")}`);
}
console.log();

// Example 9: Async example - Fetch live devices (requires internet)
console.log("9. Fetching Live Device Data (requires internet):");
async function fetchLiveExample() {
  try {
    console.log("   Fetching live Samsung devices...");
    const liveDevices = await gcamPorts.fetchLiveDevices("samsung");
    console.log(`   Found ${liveDevices.length} devices from live data`);
    if (liveDevices.length > 0) {
      console.log(`   First device: ${liveDevices[0].name}`);
    }
  } catch (error) {
    console.log(`   Error fetching live data: ${error.message}`);
  }
}

// Uncomment the line below to test live fetching (requires internet connection)
// fetchLiveExample();

console.log("\n=== End of Examples ===");
console.log("\nFor more information, visit: https://gcam-ports.com");
