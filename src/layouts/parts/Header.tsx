import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const shopItems = [
  { href: '/products', label: 'Cedar Planter Boxes' },
  { href: '/cedar-cutouts', label: 'Cedar Cutouts' },
  { href: '/cement-beach-balls', label: 'Cement Beach Balls' },
];

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/custom-orders', label: 'Custom Orders' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isShopActive = shopItems.some(item => location.pathname === item.href);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border" style={{ background: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-6">
        <div className="flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Seashore Cedar home">
            <img
              src="/assets/logo.png"
              alt=""
              aria-hidden="true"
              className="h-10 md:h-11 w-auto object-contain shrink-0"
            />
            <span className="font-heading text-lg md:text-xl leading-tight text-foreground" style={{ letterSpacing: '-0.02em' }}>
              Seashore<br />Cedar
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`relative text-sm font-medium tracking-wide transition-colors group ${
                location.pathname === '/' ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Home
              <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ease-out ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>

            {/* Shop dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShopOpen(!shopOpen)}
                className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors group ${
                  isShopActive ? 'text-primary' : 'text-foreground hover:text-primary'
                }`}
              >
                Shop
                <ChevronDown size={14} className={`transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`} />
                <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ease-out ${isShopActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
              {shopOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded border border-border bg-background shadow-lg overflow-hidden z-50">
                  {shopItems.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setShopOpen(false)}
                      className={`block px-4 py-3 text-sm transition-colors border-b border-border last:border-0 ${
                        location.pathname === item.href
                          ? 'text-primary bg-muted font-semibold'
                          : 'text-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.filter(i => i.href !== '/').map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative text-sm font-medium tracking-wide transition-colors group ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ease-out ${
                    location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/custom-orders"
              className="hidden lg:inline-flex items-center px-5 py-2.5 rounded text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Order Custom
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-5">
            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                className={`text-sm font-medium py-3 px-2 rounded transition-colors ${location.pathname === '/' ? 'text-primary bg-muted' : 'text-foreground hover:text-primary hover:bg-muted'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Mobile Shop accordion */}
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className={`flex items-center justify-between text-sm font-medium py-3 px-2 rounded transition-colors ${isShopActive ? 'text-primary bg-muted' : 'text-foreground hover:text-primary hover:bg-muted'}`}
              >
                Shop
                <ChevronDown size={14} className={`transition-transform duration-200 ${mobileShopOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileShopOpen && (
                <div className="ml-4 flex flex-col gap-1">
                  {shopItems.map(item => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`text-sm py-2.5 px-2 rounded transition-colors ${location.pathname === item.href ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
                      onClick={() => { setIsMobileMenuOpen(false); setMobileShopOpen(false); }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {navItems.filter(i => i.href !== '/').map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium py-3 px-2 rounded transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary bg-muted'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/custom-orders"
                className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Order Custom
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


