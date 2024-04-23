import { Outlet } from "react-router-dom";

const LandingPageLayout: React.FC = () => {
  return (
    <div className="flex flex-col box-border bg-black text-white">
      <Outlet />
    </div>
  );
};

export default LandingPageLayout;
