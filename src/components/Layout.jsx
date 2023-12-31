import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
