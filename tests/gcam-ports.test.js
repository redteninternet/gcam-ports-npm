const {
  GCamPorts,
  getSupportedBrands,
  getDevicesByBrand,
  getDownloadUrl,
} = require("../index");

describe("GCam Ports NPM Package", () => {
  let gcamPorts;

  beforeEach(() => {
    gcamPorts = new GCamPorts();
  });

  describe("Quick Access Functions", () => {
    test("getSupportedBrands should return all brands", () => {
      const brands = getSupportedBrands();
      expect(typeof brands).toBe("object");
      expect(Object.keys(brands)).toContain("samsung");
      expect(Object.keys(brands)).toContain("oneplus");
      expect(brands.samsung.name).toBe("Samsung");
    });

    test("getDevicesByBrand should return devices for valid brand", () => {
      const devices = getDevicesByBrand("samsung");
      expect(Array.isArray(devices)).toBe(true);
      expect(devices.length).toBeGreaterThan(0);
      expect(devices[0]).toHaveProperty("name");
      expect(devices[0]).toHaveProperty("model");
    });

    test("getDevicesByBrand should return empty array for invalid brand", () => {
      const devices = getDevicesByBrand("invalidbrand");
      expect(Array.isArray(devices)).toBe(true);
      expect(devices.length).toBe(0);
    });

    test("getDownloadUrl should return URL for valid brand", () => {
      const url = getDownloadUrl("samsung");
      expect(typeof url).toBe("string");
      expect(url).toContain("gcam-ports.com");
      expect(url).toContain("samsung");
    });

    test("getDownloadUrl should return null for invalid brand", () => {
      const url = getDownloadUrl("invalidbrand");
      expect(url).toBeNull();
    });
  });

  describe("GCamPorts Class", () => {
    test("should create instance with default options", () => {
      expect(gcamPorts).toBeInstanceOf(GCamPorts);
      expect(gcamPorts.baseUrl).toBe("https://gcam-ports.com");
      expect(gcamPorts.timeout).toBe(5000);
    });

    test("should create instance with custom options", () => {
      const customOptions = {
        timeout: 10000,
        userAgent: "test-agent",
      };
      const customGcamPorts = new GCamPorts(customOptions);
      expect(customGcamPorts.timeout).toBe(10000);
      expect(customGcamPorts.userAgent).toBe("test-agent");
    });

    test("getSupportedBrands should return brands object", () => {
      const brands = gcamPorts.getSupportedBrands();
      expect(typeof brands).toBe("object");
      expect(Object.keys(brands).length).toBeGreaterThan(10);
    });

    test("getDevicesByBrand should handle case insensitive input", () => {
      const devicesLower = gcamPorts.getDevicesByBrand("samsung");
      const devicesUpper = gcamPorts.getDevicesByBrand("SAMSUNG");
      const devicesMixed = gcamPorts.getDevicesByBrand("SamSung");

      expect(devicesLower).toEqual(devicesUpper);
      expect(devicesLower).toEqual(devicesMixed);
    });

    test("searchDevices should find devices across brands", () => {
      const results = gcamPorts.searchDevices("13");
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0]).toHaveProperty("brand");
    });

    test("searchDevices should return empty array for non-existent device", () => {
      const results = gcamPorts.searchDevices("nonexistentdevice12345");
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    test("isBrandSupported should return correct boolean values", () => {
      expect(gcamPorts.isBrandSupported("samsung")).toBe(true);
      expect(gcamPorts.isBrandSupported("SAMSUNG")).toBe(true);
      expect(gcamPorts.isBrandSupported("apple")).toBe(false);
      expect(gcamPorts.isBrandSupported("")).toBe(false);
    });

    test("getBrandInfo should return brand information", () => {
      const brandInfo = gcamPorts.getBrandInfo("samsung");
      expect(brandInfo).toHaveProperty("name");
      expect(brandInfo).toHaveProperty("url");
      expect(brandInfo).toHaveProperty("description");
      expect(brandInfo).toHaveProperty("processor_types");
      expect(Array.isArray(brandInfo.processor_types)).toBe(true);
    });

    test("getBrandInfo should return null for invalid brand", () => {
      const brandInfo = gcamPorts.getBrandInfo("invalidbrand");
      expect(brandInfo).toBeNull();
    });

    test("getDeviceCount should return correct count", () => {
      const count = gcamPorts.getDeviceCount("samsung");
      expect(typeof count).toBe("number");
      expect(count).toBeGreaterThan(0);
    });

    test("getDeviceCount should return 0 for invalid brand", () => {
      const count = gcamPorts.getDeviceCount("invalidbrand");
      expect(count).toBe(0);
    });

    test("getTotalDeviceCount should return total count", () => {
      const total = gcamPorts.getTotalDeviceCount();
      expect(typeof total).toBe("number");
      expect(total).toBeGreaterThan(20); // Updated to match current sample data
    });

    test("generateDeviceUrl should create valid URLs", () => {
      const url = gcamPorts.generateDeviceUrl("samsung", "Galaxy S25");
      expect(typeof url).toBe("string");
      expect(url).toContain("gcam-ports.com");
      expect(url).toContain("samsung");
      expect(url).toContain("galaxy-s25");
    });

    test("generateDeviceUrl should handle special characters", () => {
      const url = gcamPorts.generateDeviceUrl("samsung", "Galaxy S25+ Ultra");
      expect(url).toContain("galaxy-s25-ultra");
      expect(url).not.toContain("+");
      expect(url).not.toContain(" ");
    });

    test("generateDeviceUrl should return null for unsupported brand", () => {
      const url = gcamPorts.generateDeviceUrl(
        "unsupportedbrand",
        "Some Device"
      );
      expect(url).toBeNull();
    });

    test("getStats should return comprehensive statistics", () => {
      const stats = gcamPorts.getStats();
      expect(stats).toHaveProperty("totalBrands");
      expect(stats).toHaveProperty("totalDevices");
      expect(stats).toHaveProperty("devicesByBrand");
      expect(stats).toHaveProperty("supportedBrands");

      expect(typeof stats.totalBrands).toBe("number");
      expect(typeof stats.totalDevices).toBe("number");
      expect(Array.isArray(stats.supportedBrands)).toBe(true);
      expect(typeof stats.devicesByBrand).toBe("object");

      expect(stats.totalBrands).toBeGreaterThan(10);
      expect(stats.totalDevices).toBeGreaterThan(20); // Updated to match current sample data
    });
  });

  describe("Data Validation", () => {
    test("all brands should have required properties", () => {
      const brands = gcamPorts.getSupportedBrands();
      Object.entries(brands).forEach(([key, brand]) => {
        expect(brand).toHaveProperty("name");
        expect(brand).toHaveProperty("url");
        expect(brand).toHaveProperty("description");
        expect(brand).toHaveProperty("processor_types");
        expect(brand).toHaveProperty("popular_series");

        expect(typeof brand.name).toBe("string");
        expect(typeof brand.url).toBe("string");
        expect(typeof brand.description).toBe("string");
        expect(Array.isArray(brand.processor_types)).toBe(true);
        expect(Array.isArray(brand.popular_series)).toBe(true);

        expect(brand.url).toContain("gcam-ports.com");
      });
    });

    test("all devices should have required properties", () => {
      const brands = Object.keys(gcamPorts.getSupportedBrands());
      brands.forEach((brand) => {
        const devices = gcamPorts.getDevicesByBrand(brand);
        devices.forEach((device) => {
          expect(device).toHaveProperty("name");
          expect(device).toHaveProperty("model");
          expect(device).toHaveProperty("url");
          expect(device).toHaveProperty("processor");
          expect(device).toHaveProperty("android_version");
          expect(device).toHaveProperty("release_year");

          expect(typeof device.name).toBe("string");
          expect(typeof device.model).toBe("string");
          expect(typeof device.url).toBe("string");
          expect(typeof device.processor).toBe("string");
          expect(typeof device.android_version).toBe("string");
          expect(typeof device.release_year).toBe("number");

          expect(device.url).toContain("gcam-ports.com");
          expect(device.release_year).toBeGreaterThan(2015);
          expect(device.release_year).toBeLessThanOrEqual(
            new Date().getFullYear() + 1
          );
        });
      });
    });
  });

  describe("Error Handling", () => {
    test("should handle undefined inputs gracefully", () => {
      expect(() => gcamPorts.getDevicesByBrand(undefined)).not.toThrow();
      expect(() => gcamPorts.searchDevices(undefined)).not.toThrow();
      expect(() => gcamPorts.isBrandSupported(undefined)).not.toThrow();
    });

    test("should handle null inputs gracefully", () => {
      expect(() => gcamPorts.getDevicesByBrand(null)).not.toThrow();
      expect(() => gcamPorts.searchDevices(null)).not.toThrow();
      expect(() => gcamPorts.isBrandSupported(null)).not.toThrow();
    });

    test("should handle empty string inputs gracefully", () => {
      expect(gcamPorts.getDevicesByBrand("")).toEqual([]);
      expect(gcamPorts.searchDevices("")).toEqual([]);
      expect(gcamPorts.isBrandSupported("")).toBe(false);
    });
  });
});

// Integration tests (require network connection)
describe("Integration Tests", () => {
  let gcamPorts;

  beforeEach(() => {
    gcamPorts = new GCamPorts({ timeout: 10000 });
  });

  // These tests require internet connection and are optional
  test.skip("fetchLiveDevices should work with network connection", async () => {
    try {
      const devices = await gcamPorts.fetchLiveDevices("samsung");
      expect(Array.isArray(devices)).toBe(true);
      if (devices.length > 0) {
        expect(devices[0]).toHaveProperty("name");
        expect(devices[0]).toHaveProperty("url");
      }
    } catch (error) {
      // Network error is acceptable in testing environment
      expect(error.message).toContain("samsung");
    }
  }, 15000);

  test.skip("fetchLiveDevices should handle invalid brand", async () => {
    await expect(gcamPorts.fetchLiveDevices("invalidbrand")).rejects.toThrow(
      "not supported"
    );
  });
});
