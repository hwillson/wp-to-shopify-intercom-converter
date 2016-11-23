// Make sure necessary environment variables are defined and available
const mandatoryEnvVars = [
  'SHOPIFY_ADMIN_URL',
  'SHOPIFY_API_KEY',
  'SHOPIFY_API_PASS',
  'INTERCOM_PAT',
];
mandatoryEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Uh oh - the ${envVar} environment variable is missing!`);
  }
});
