import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { BROWSER_ROUTE } from "./constants/BROWSER_ROUTE";

const AuthLayout = lazy(() => import("./views/layouts/AuthLayout"));
const AppLayout = lazy(() => import("./views/layouts/AppLayout"));

//? AUTH
const LandingPage = lazy(() => import("./views/auth/LandingPage"));

//? APP
const HomePage = lazy(() => import("./views/app/Home"));

function Router() {
  return (
    <Suspense>
      <BrowserRouter>
        <Routes>
          <Route path="/app" element={<AppLayout />}>
            <Route path="" element={<Navigate to={BROWSER_ROUTE.HOME} />} />
            <Route path={BROWSER_ROUTE.HOME} element={<HomePage />} />
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route
              path={BROWSER_ROUTE.LANDING_PAGE}
              element={<LandingPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
