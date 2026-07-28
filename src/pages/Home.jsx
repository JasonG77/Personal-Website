import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};
