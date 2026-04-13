import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border bg-warm-brown text-cream">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <img src={logo} alt="MangoMart" width={32} height={32} />
            <span className="font-display text-lg font-bold">MangoMart</span>
          </div>
          <p className="text-sm opacity-80">
            Premium mangoes delivered fresh from the orchards to your doorstep. Taste the sunshine!
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <Link to="/" className="hover:opacity-100">Home</Link>
            <Link to="/products" className="hover:opacity-100">Shop</Link>
            <Link to="/cart" className="hover:opacity-100">Cart</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-2 text-sm opacity-80">
            <span>support@mangomart.com</span>
            <span>+91 98765 43210</span>
            <span>Mumbai, Maharashtra</span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider">Follow Us</h4>
          <div className="flex gap-4 text-sm opacity-80">
            <a href="#" className="hover:opacity-100">Instagram</a>
            <a href="#" className="hover:opacity-100">Facebook</a>
            <a href="#" className="hover:opacity-100">Twitter</a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-cream/20 pt-6 text-center text-xs opacity-60">
        © 2026 MangoMart. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
