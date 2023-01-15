import "../index.css";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Nav from "../Nav";
import Footer from "../Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  useEffect(() => {
    const heading = document.querySelector("main");
    if (heading) {
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  useEffect(() => {
    console.log("Page refreshed");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
