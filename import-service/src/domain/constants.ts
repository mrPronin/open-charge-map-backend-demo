export const CONSTANTS = {
  // Time offset for POI import: 10 minutes
  MINUTES_OFFSET_FOR_POI_UPDATE: 10,

  // From OCM documentation. String to identify your application. Optional but recommended to distinguish your client from other bots/crawlers
  OCM_CLIENT_NAME: 'open-charge-map-backend',

  // Temporary file for storing imported POI data
  POI_FILE_NAME: '/tmp/poi.json',

  // The number of objects that we will save to the database in one batch.
  POI_BATCH_PERSIST_AMOUNT: 1000,

  // Initial POI import request timeout: 30 minutes
  POI_INITIAL_IMPORT_TIMEOUT: 30 * 60 * 1000,

  // Initial POI import request max results
  POI_INITIAL_IMPORT_MAX_RESULTS: 200000
} as const;
