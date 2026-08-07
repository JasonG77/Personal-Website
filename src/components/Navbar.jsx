import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PageContainer } from "./system/DesignSystem";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav
      className={cn(
        "fixed w-full z-40 py-3 transition-all duration-300 portfolio-nav nav-visible"
      )}
    >
      <PageContainer className="portfolio-nav-inner">
        <NavLink
          className="text-xl font-bold text-primary flex items-center"
          to="/"
        >
          <span className="relative z-10">JG / PORTFOLIO</span>
        </NavLink>

        {/* desktop nav */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, key) => (
            <NavLink
              key={key}
              to={item.href}
              className={({ isActive }) => cn("text-foreground/80 hover:text-primary transition-colors duration-300", isActive && "nav-active")}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* mobile nav */}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>

        <div
          className={cn(
            "portfolio-mobile-menu fixed inset-0 bg-[#f3efe7]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <NavLink
                key={key}
                to={item.href}
                className={({ isActive }) => cn("text-foreground/80 hover:text-primary transition-colors duration-300", isActive && "nav-active")}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </PageContainer>
    </nav>
  );
};
