import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
{ path: "/", label: "Home" },
{ path: "/plans", label: "Tariff Plans" },
{ path: "/services", label: "Services" },
{ path: "/new-connection", label: "New Connection" },
{ path: "/contact", label: "Contact Us" }];


export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Wifi className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold font-['Outfit']">
              <span className="text-cyan-400">Fibre</span>Tel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-sm font-medium transition-colors hover:text-cyan-400 ${
              location.pathname === link.path ?
              "text-cyan-400 active" :
              "text-gray-300"}`
              }
              data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>

                {link.label}
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/new-connection">
              <Button
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold btn-cyber"
                data-testid="nav-get-started-btn">

                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="mobile-menu-btn">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0f172a] border-white/10 w-72">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) =>
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-cyan-400 ${
                  location.pathname === link.path ?
                  "text-cyan-400" :
                  "text-gray-300"}`
                  }
                  data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>

                    {link.label}
                  </Link>
                )}
                <Link to="/new-connection" onClick={() => setIsOpen(false)}>
                  <Button
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold mt-4"
                    data-testid="mobile-get-started-btn">

                    Get Started
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>);

}