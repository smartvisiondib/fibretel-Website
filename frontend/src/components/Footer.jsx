import { Link } from "react-router-dom";
import { Wifi, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0f1a] border-t border-white/10 pt-16 pb-8" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                <Wifi className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-xl font-bold font-['Outfit']">
                <span className="text-cyan-400">Fibre</span>Tel
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Delivering lightning-fast broadband internet to homes and businesses since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Outfit'] font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/plans" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Tariff Plans
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/new-connection" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  New Connection
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Outfit'] font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Home Broadband</li>
              <li className="text-gray-400 text-sm">Business Internet</li>
              <li className="text-gray-400 text-sm">Gaming Plans</li>
              <li className="text-gray-400 text-sm">OTT Bundles</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-['Outfit'] font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                1800-123-4567
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                fibreteldib@gmail.com
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                Jhalukpara Road, Dibrugarh, Assam - 786001
               </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 FibreTel ISP. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-cyan-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}