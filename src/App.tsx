import { useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Articles } from "@/pages/Articles";
import { ArticleDetail } from "@/pages/ArticleDetail";

import ROUTES from "@/routes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.home.path} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.articles.path} element={<Articles />} />
          <Route
            path={ROUTES.articleDetail.path}
            element={<ArticleDetail />}
          />

          <Route path="*" element={<Navigate to={ROUTES.home.path} replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
