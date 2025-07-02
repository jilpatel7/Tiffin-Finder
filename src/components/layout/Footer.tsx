import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold">
                Tiffin<span className="text-orange-500">Find</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting you with the best homemade tiffin services in your area. 
              Healthy, affordable, and delicious meals delivered fresh.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Home
              </Link>
              <Link to="/search" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Search Providers
              </Link>
              <Link to="/become-provider" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Become a Provider
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-orange-500 transition-colors">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-gray-400 hover:text-orange-500 transition-colors">
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@tiffinfind.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+91 9876543210</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 TiffinFind. All rights reserved. Made with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;