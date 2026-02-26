export default {
  routes: [
    {
      method: "POST",
      path: "/newsletter",
      handler: "newsletter.subscribe",
      config: { auth: false },
    },
    {
      method: "POST",
      path: "/newsletter/unsubscribe",
      handler: "newsletter.unsubscribe",
      config: {
        auth: false,
      },
    },
  ],
};
