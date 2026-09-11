import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout() {
  return (
    <SmoothScrollProvider>
      <div
        className="relative min-h-screen bg-white"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ScrollToTop />
        <Header />
        <Outlet />
      </div>
    </SmoothScrollProvider>
  );
}
