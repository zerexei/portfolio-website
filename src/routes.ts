const ROUTES = {
  home: {
    name: "home",
    path: "/",
    title: "Home",
  },

  articles: {
    name: "articles",
    path: "/articles",
    title: "Articles",
  },

  articleDetail: {
    name: "articleDetail",
    path: "/articles/:slug",
    title: "Article",
    getPath: (slug: string) => `/articles/${slug}`,
  },

  systemDesign: {
    name: "systemDesign",
    path: "/system-design",
    title: "System Design",
  },
};

export default ROUTES;
