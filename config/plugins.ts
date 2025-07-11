export default ({ env }) => ({
  // S3 upload images plugin
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
          xsmall: 64
        },
        baseUrl: "https://img.devcorner.top",
        rootPath: "blog/",
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_ACCESS_KEY_ID'),
            secretAccessKey: env('AWS_ACCESS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: env('AWS_BUCKET'),
          },
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
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
