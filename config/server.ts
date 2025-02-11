
const assignProductionUrl = ({ env }) => {
  const urlProduction = env('NODE_ENV') === "production" ? {
    url: "https://api.devcorner.top",
  } : {}
  return urlProduction
}

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  ...assignProductionUrl({ env }),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
