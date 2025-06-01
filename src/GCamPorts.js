const axios = require("axios");
const cheerio = require("cheerio");
const brands = require("../data/brands.json");
const devices = require("../data/devices.json");

class GCamPorts {
  constructor(options = {}) {
    this.baseUrl = "https://gcam-ports.com";
    this.timeout = options.timeout || 5000;
    this.userAgent = options.userAgent || "gcam-ports-npm/1.0.0";

    this.httpClient = axios.create({
      timeout: this.timeout,
      headers: {
        "User-Agent": this.userAgent,
      },
    });
  }

  /**
   * Get all supported brands
   * @returns {Object} List of supported brands with their info
   */
  getSupportedBrands() {
    return brands;
  }

  /**
   * Get devices for a specific brand
   * @param {string} brand - Brand name (e.g., 'samsung', 'oneplus')
   * @returns {Array} List of devices for the brand
   */
  getDevicesByBrand(brand) {
    if (!brand || typeof brand !== "string") {
      return [];
    }
    const normalizedBrand = brand.toLowerCase();
    return devices[normalizedBrand] || [];
  }

  /**
   * Get download page URL for a specific brand
   * @param {string} brand - Brand name
   * @returns {string|null} Download URL or null if brand not found
   */
  getDownloadUrl(brand) {
    if (!brand || typeof brand !== "string") {
      return null;
    }
    const normalizedBrand = brand.toLowerCase();
    return brands[normalizedBrand]?.url || null;
  }

  /**
   * Search for devices across all brands
   * @param {string} query - Search query
   * @returns {Array} Array of matching devices
   */
  searchDevices(query) {
    if (!query || typeof query !== "string" || query.trim() === "") {
      return [];
    }

    const results = [];
    const searchTerm = query.toLowerCase();

    Object.keys(devices).forEach((brand) => {
      devices[brand].forEach((device) => {
        if (
          device.name.toLowerCase().includes(searchTerm) ||
          device.model.toLowerCase().includes(searchTerm)
        ) {
          results.push({
            ...device,
            brand: brand,
          });
        }
      });
    });

    return results;
  }

  /**
   * Get brand information by name
   * @param {string} brand - Brand name
   * @returns {Object|null} Brand information or null if not found
   */
  getBrandInfo(brand) {
    if (!brand || typeof brand !== "string") {
      return null;
    }
    const normalizedBrand = brand.toLowerCase();
    return brands[normalizedBrand] || null;
  }

  /**
   * Check if a brand is supported
   * @param {string} brand - Brand name
   * @returns {boolean} True if brand is supported
   */
  isBrandSupported(brand) {
    if (!brand || typeof brand !== "string") {
      return false;
    }
    const normalizedBrand = brand.toLowerCase();
    return !!brands[normalizedBrand];
  }

  /**
   * Get device count for a specific brand
   * @param {string} brand - Brand name
   * @returns {number} Number of supported devices
   */
  getDeviceCount(brand) {
    if (!brand || typeof brand !== "string") {
      return 0;
    }
    const normalizedBrand = brand.toLowerCase();
    return devices[normalizedBrand]?.length || 0;
  }

  /**
   * Get total device count across all brands
   * @returns {number} Total number of supported devices
   */
  getTotalDeviceCount() {
    return Object.values(devices).reduce(
      (total, brandDevices) => total + brandDevices.length,
      0
    );
  }

  /**
   * Fetch live device list from website (requires internet connection)
   * @param {string} brand - Brand name
   * @returns {Promise<Array>} Promise resolving to array of devices
   */
  async fetchLiveDevices(brand) {
    try {
      const brandInfo = this.getBrandInfo(brand);
      if (!brandInfo) {
        throw new Error(`Brand '${brand}' not supported`);
      }

      const response = await this.httpClient.get(brandInfo.url);
      const $ = cheerio.load(response.data);
      const devices = [];

      // Parse device links from the page
      $("a").each((i, el) => {
        const href = $(el).attr("href");
        const text = $(el).text().trim();

        if (href && href.includes(brand) && text) {
          devices.push({
            name: text,
            url: href.startsWith("http") ? href : `${this.baseUrl}${href}`,
            brand: brand,
          });
        }
      });

      return devices;
    } catch (error) {
      throw new Error(
        `Failed to fetch live devices for ${brand}: ${error.message}`
      );
    }
  }

  /**
   * Get statistics about the GCam ports database
   * @returns {Object} Statistics object
   */
  getStats() {
    const brandCount = Object.keys(brands).length;
    const totalDevices = this.getTotalDeviceCount();
    const devicesByBrand = {};

    Object.keys(devices).forEach((brand) => {
      devicesByBrand[brand] = devices[brand].length;
    });

    return {
      totalBrands: brandCount,
      totalDevices: totalDevices,
      devicesByBrand: devicesByBrand,
      supportedBrands: Object.keys(brands),
    };
  }

  /**
   * Generate a download link for a specific device
   * @param {string} brand - Brand name
   * @param {string} deviceModel - Device model
   * @returns {string|null} Generated download URL or null
   */
  generateDeviceUrl(brand, deviceModel) {
    const normalizedBrand = brand.toLowerCase();
    const normalizedModel = deviceModel
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    if (!this.isBrandSupported(brand)) {
      return null;
    }

    return `${this.baseUrl}/${normalizedBrand}/${normalizedModel}-google-camera/`;
  }
}

module.exports = GCamPorts;
