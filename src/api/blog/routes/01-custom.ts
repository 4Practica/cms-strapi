export default {
  routes: [
    {
      method: "GET",
      path: "/blogs/:slug",
      handler: "blog.findOne",
      config: { auth: false },
    },
    {
      method: "GET",
      path: "/blogs/filter/:search",
      handler: "blog.customSearch",
      config: { auth: false },
    },
  ],
};
