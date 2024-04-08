import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col box-border bg-black text-white">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
