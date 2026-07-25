import { Navbar } from "../components/Navbar";
import { ProjectsSection } from "../components/ProjectsSection";
import { Footer } from "../components/Footer";

export const ProjectsPage = () => (
  <div className="page-shell">
    <Navbar />
    <main className="inner-page">
      <ProjectsSection />
    </main>
    <Footer />
  </div>
);
