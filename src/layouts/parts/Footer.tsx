import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'hsl(25, 35%, 18%)', color: 'hsl(var(--background))' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" aria-label="Seashore Cedar home">
              <img
                src="/assets/logo.png"
                  alt=""
                  aria-hidden="true"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-heading text-lg leading-tight text-white" style={{ letterSpacing: '-0.02em' }}>
                  Seashore<br />Cedar
                </span>
            </Link>
            <p className="text-sm leading-relaxed opacity-75 max-w-xs">
              Handcrafted cedar planter boxes, coastal home goods, and custom engraving — made with care on the shore.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase opacity-50 mb-5">Shop</h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/products#planters', label: 'Planter Boxes' },
                { href: '/products#cedar-goods', label: 'Cedar Goods' },
                { href: '/custom-orders', label: 'Custom Engraving' },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase opacity-50 mb-5">Company</h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
                { href: '/custom-orders', label: 'Custom Orders' },
              ].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
          <p className="text-xs opacity-50">
            © {currentYear} Seashore Cedar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs opacity-50 hover:opacity-80 transition-opacity">Privacy</Link>
            <Link to="/terms" className="text-xs opacity-50 hover:opacity-80 transition-opacity">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
