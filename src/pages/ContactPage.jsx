import { Navbar } from "../components/Navbar";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const ContactPage = () => (
  <div className="page-shell">
    <Navbar />
    <main className="inner-page">
      <ContactSection />
    </main>
    <Footer />
  </div>
);
