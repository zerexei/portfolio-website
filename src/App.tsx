import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import routes from "@/routes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LayoutWrapper = () => {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: routes.home.path,
    element: <LayoutWrapper />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { Home } = await import("@/pages/Home");
          return { Component: Home };
        },
      },
      {
        path: routes.services.path,
        lazy: async () => {
          const { ServicesPage } = await import("@/pages/ServicesPage");
          return { Component: ServicesPage };
        },
      },
      {
        path: routes.systemDesign.path,
        lazy: async () => {
          const { SystemDesign } = await import("@/pages/SystemDesign");
          return { Component: SystemDesign };
        },
      },
      {
        path: routes.systemDesignDetail.path,
        lazy: async () => {
          const { SystemDesignDetail } = await import("@/pages/SystemDesignDetail");
          return { Component: SystemDesignDetail };
        },
      },
      {
        path: routes.articles.path,
        lazy: async () => {
          const { Articles } = await import("@/pages/Articles");
          return { Component: Articles };
        },
      },
      {
        path: routes.articleDetail.path,
        lazy: async () => {
          const { ArticleDetail } = await import("@/pages/ArticleDetail");
          return { Component: ArticleDetail };
        },
      },
      {
        path: "*",
        element: <Navigate to={routes.home.path} replace />,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
