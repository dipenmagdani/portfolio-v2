"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { useIdentity } from "@/components/identity-provider";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeRole, setActiveRole } = useIdentity();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-neutral-gray/10 py-3"
          : "bg-transparent py-6",
      )}
    >
      <div className="w-full max-w-6xl flex items-center justify-between px-6 md:px-8">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="font-bold text-xl tracking-tighter"
        >
          D<span className="text-accent">.</span>
        </a>

        {/* Identity Toggle */}
        <div className="flex items-center gap-1 bg-neutral-900 rounded p-1 font-mono text-[10px] md:text-xs text-neutral-400 mx-auto md:mx-0">
          <button
            onClick={() => setActiveRole("developer")}
            className={cn(
              "px-2 md:px-3 py-1 md:py-1.5 rounded transition-all duration-200",
              activeRole === "developer"
                ? "bg-neutral-800 text-foreground"
                : "hover:text-neutral-200",
            )}
          >
            Developer
          </button>
          <button
            onClick={() => setActiveRole("designer")}
            className={cn(
              "px-2 md:px-3 py-1 md:py-1.5 rounded transition-all duration-200",
              activeRole === "designer"
                ? "bg-neutral-800 text-foreground"
                : "hover:text-neutral-200",
            )}
          >
            Designer
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {NAV_LINKS.filter((l) => l.name !== "Home").map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="relative group text-neutral-gray hover:text-foreground transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-foreground"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-neutral-gray/10 flex flex-col items-center py-6 gap-6 md:hidden">
          {NAV_LINKS.filter((l) => l.name !== "Home").map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-lg font-medium text-neutral-gray hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
