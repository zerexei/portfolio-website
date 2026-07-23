import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useLocation, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import routes from "@/routes";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // Fallback for lazy loaded content: wait a tiny bit and try again
        const timer = setTimeout(() => {
          const retryElement = document.getElementById(elementId);
          if (retryElement) {
            retryElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

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
        path: routes.resume.path,
        lazy: async () => {
          const { ResumePage } = await import("@/pages/ResumePage");
          return { Component: ResumePage };
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
