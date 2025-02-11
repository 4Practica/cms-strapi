export default ({ env }) => ({
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "marketing@devcorner.top",
        defaultReplyTo: "marketing@devcorner.top",
      },
    },
  },
  // ...
  webtools: {
    enabled: true,
    config: {
      default_pattern: "/[pluralName]/[id]",
      website_url: null,
    },
  },
});
