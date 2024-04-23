import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { BROWSER_ROUTE } from "./constants/BROWSER_ROUTE";
import { BeatLoader } from "react-spinners";

const AuthLayout = lazy(() => import("./views/layouts/AuthLayout"));
const AppLayout = lazy(() => import("./views/layouts/AppLayout"));
const LandingPageLayout = lazy(
  () => import("./views/layouts/LandingPageLayout")
);

//? AUTH
const LandingPage = lazy(() => import("./views/landingPage/LandingPage"));
const LoginPage = lazy(() => import("./views/auth/Login/Login"));
const RegisterPage = lazy(() => import("./views/auth/Register/Register"));
const ForgotPasswordPage = lazy(
  () => import("./views/auth/ForgotPassword/ForgotPassword")
);

//? APP
const HomePage = lazy(() => import("./views/app/Home"));

const Loading = () => (
  <div className="flex h-full justify-center items-center bg-black text-white">
    <BeatLoader />
  </div>
);

function Router() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/app" element={<AppLayout />}>
            <Route path="" element={<Navigate to={BROWSER_ROUTE.HOME} />} />
            <Route path={BROWSER_ROUTE.HOME} element={<HomePage />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path={BROWSER_ROUTE.LOGIN} element={<LoginPage />} />
            <Route path={BROWSER_ROUTE.REGISTER} element={<RegisterPage />} />
            <Route
              path={`${BROWSER_ROUTE.FORGOT_PASSWORD}`}
              element={<ForgotPasswordPage />}
            />
          </Route>

          <Route path="/" element={<LandingPageLayout />}>
            <Route
              path={BROWSER_ROUTE.LANDING_PAGE}
              element={<LandingPage />}
            />
          </Route>

          <Route
            path="*"
            element={<Navigate to={BROWSER_ROUTE.LANDING_PAGE} />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default Router;
