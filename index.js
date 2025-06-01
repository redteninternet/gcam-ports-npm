const GCamPorts = require("./src/GCamPorts");
const brands = require("./data/brands.json");
const devices = require("./data/devices.json");

module.exports = {
  GCamPorts,
  brands,
  devices,

  // Quick access methods
  getSupportedBrands: () => brands,
  getDevicesByBrand: (brand) => devices[brand] || [],
  getDownloadUrl: (brand) => brands[brand]?.url || null,

  // Main class instance
  create: (options = {}) => new GCamPorts(options),
};
