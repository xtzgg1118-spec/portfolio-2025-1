import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NavigationItem } from '../types';

interface PageDetailProps {
  page: NavigationItem | null;
  onClose: () => void;
}

const PageDetail: React.FC<PageDetailProps> = ({ page, onClose }) => {
  if (!page || !page.content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 z-[100] w-full md:w-1/2 bg-white/95 backdrop-blur-2xl shadow-2xl border-l border-gray-100 flex flex-col"
    >
       {/* Close Button */}
      <div className="absolute top-8 right-8 z-10">
        <button 
            onClick={onClose}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
            <X size={20} className="text-gray-600" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-12 md:p-20">
         <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
         >
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-8">Page</h2>
            <h1 className="text-5xl md:text-6xl font-thin text-gray-900 mb-12">{page.content.title}</h1>
            
            <div className="prose prose-lg text-gray-600 font-light leading-loose whitespace-pre-wrap">
                {page.content.body}
            </div>
         </motion.div>
      </div>

      <div className="p-12 border-t border-gray-100 bg-gray-50/50">
         <p className="text-xs text-gray-400 text-center">© 2024 Glass Dimension</p>
      </div>
    </motion.div>
  );
};

export default PageDetail;