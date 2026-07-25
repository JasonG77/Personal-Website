import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} Jason Gutierrez. Built with intention.
      </p>
      <Link
        to="/"
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
        aria-label="Return to player"
      >
        <ArrowUp size={20} />
      </Link>
    </footer>
  );
};
