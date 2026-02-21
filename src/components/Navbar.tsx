import React from 'react';
import { ShoppingBasket, User, Menu as MenuIcon, Search } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00A82D] rounded-lg flex items-center justify-center">
                <ShoppingBasket className="text-white w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-[#00A82D] tracking-tight">CIY</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-[#00A82D] font-medium text-sm">Our Plans</a>
              <a href="#" className="text-gray-600 hover:text-[#00A82D] font-medium text-sm">How It Works</a>
              <a href="#" className="text-gray-600 hover:text-[#00A82D] font-medium text-sm">Our Menu</a>
              <a href="#" className="text-gray-600 hover:text-[#00A82D] font-medium text-sm">Gift Cards</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-full border border-gray-200 transition-colors">
              Log In
            </button>
            <button className="px-6 py-2 text-sm font-semibold text-white bg-[#00A82D] hover:bg-[#008a25] rounded-full shadow-sm transition-all">
              Get Started
            </button>
            <button className="md:hidden p-2 text-gray-400">
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
