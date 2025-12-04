import React from 'react';
import { NAV_ITEMS } from '../data';
import { NavigationItem } from '../types';

interface MenuProps {
  onItemClick: (item: NavigationItem) => void;
}

const Menu: React.FC<MenuProps> = ({ onItemClick }) => {
  return (
    <nav className="fixed top-8 left-8 z-50 flex flex-wrap gap-4">
      {NAV_ITEMS.map((item, index) => (
        <button
          key={index}
          onClick={() => onItemClick(item)}
          className="
            px-6 py-3
            text-sm font-medium tracking-wide
            bg-white
            hover:bg-gray-50 hover:shadow-md
            transition-all duration-300
            rounded-full
            text-gray-900
            shadow-sm
            border border-gray-100/50
          "
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Menu;