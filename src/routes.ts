export const routes = {
  home: {
    name: "home",
    path: "/",
    title: "Home",
  },
  services: {
    name: "services",
    path: "/services",
    title: "Services",
  },
  systemDesign: {
    name: "systemDesign",
    path: "/system-design",
    title: "System Design",
  },
  systemDesignDetail: {
    name: "systemDesign.detail",
    path: "/system-design/:slug",
    title: "System Design Detail",
    getPath: (slug: string) => `/system-design/${slug}` as const,
  },
  articles: {
    name: "articles",
    path: "/articles",
    title: "Articles",
  },
  articleDetail: {
    name: "articles.detail",
    path: "/articles/:slug",
    title: "Article",
    getPath: (slug: string) => `/articles/${slug}` as const,
  },
} as const;

export type RouteName = keyof typeof routes;
export default routes;
