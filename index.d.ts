export interface GCamPortsOptions {
  timeout?: number;
  userAgent?: string;
}

export interface BrandInfo {
  name: string;
  url: string;
  description: string;
  processor_types: string[];
  popular_series: string[];
}

export interface Device {
  name: string;
  model: string;
  url: string;
  processor: string;
  android_version: string;
  release_year: number;
}

export interface DeviceSearchResult extends Device {
  brand: string;
}

export interface LiveDevice {
  name: string;
  url: string;
  brand: string;
}

export interface PackageStats {
  totalBrands: number;
  totalDevices: number;
  devicesByBrand: Record<string, number>;
  supportedBrands: string[];
}

export interface BrandsData {
  [brandKey: string]: BrandInfo;
}

export interface DevicesData {
  [brandKey: string]: Device[];
}

export declare class GCamPorts {
  constructor(options?: GCamPortsOptions);

  baseUrl: string;
  timeout: number;
  userAgent: string;

  /**
   * Get all supported brands
   */
  getSupportedBrands(): BrandsData;

  /**
   * Get devices for a specific brand
   */
  getDevicesByBrand(brand: string): Device[];

  /**
   * Get download page URL for a specific brand
   */
  getDownloadUrl(brand: string): string | null;

  /**
   * Search for devices across all brands
   */
  searchDevices(query: string): DeviceSearchResult[];

  /**
   * Get brand information by name
   */
  getBrandInfo(brand: string): BrandInfo | null;

  /**
   * Check if a brand is supported
   */
  isBrandSupported(brand: string): boolean;

  /**
   * Get device count for a specific brand
   */
  getDeviceCount(brand: string): number;

  /**
   * Get total device count across all brands
   */
  getTotalDeviceCount(): number;

  /**
   * Fetch live device list from website (requires internet connection)
   */
  fetchLiveDevices(brand: string): Promise<LiveDevice[]>;

  /**
   * Get statistics about the GCam ports database
   */
  getStats(): PackageStats;

  /**
   * Generate a download link for a specific device
   */
  generateDeviceUrl(brand: string, deviceModel: string): string | null;
}

// Quick access functions
export declare function getSupportedBrands(): BrandsData;
export declare function getDevicesByBrand(brand: string): Device[];
export declare function getDownloadUrl(brand: string): string | null;

// Data exports
export declare const brands: BrandsData;
export declare const devices: DevicesData;

// Factory function
export declare function create(options?: GCamPortsOptions): GCamPorts;

// Default export
declare const gcamPorts: {
  GCamPorts: typeof GCamPorts;
  brands: BrandsData;
  devices: DevicesData;
  getSupportedBrands: typeof getSupportedBrands;
  getDevicesByBrand: typeof getDevicesByBrand;
  getDownloadUrl: typeof getDownloadUrl;
  create: typeof create;
};

export default gcamPorts;
