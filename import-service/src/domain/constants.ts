export const CONSTANTS = {
  // Time offset for POI import: 10 minutes
  timeOffsetForPOIImport: 10,
  // From OCM documentation. String to identify your application. Optional but recommended to distinguish your client from other bots/crawlers
  ocmClientName: 'open-charge-map-backend',
  // Temporary file for storing imported POI data
  poiFileName: '/tmp/poi.json'
} as const;
