/* eslint-disable react/prop-types */
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

export const PageShell = ({ children }) => (
  <div className="page-shell">
    <Navbar />
    <main className="inner-page">{children}</main>
    <Footer />
  </div>
);
