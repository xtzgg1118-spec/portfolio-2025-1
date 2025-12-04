import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ControlsProps {
  onIndexClick: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onIndexClick }) => {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Hint Text */}
      <div className="flex items-center gap-2 text-gray-400 animate-pulse">
        <span className="text-[10px] uppercase tracking-[0.2em] font-light">スライドしてプレビュー (Slide to preview)</span>
        <ArrowRight size={14} className="opacity-50" />
      </div>

      {/* Action Buttons (Pointer events re-enabled) */}
      <div className="flex gap-2 pointer-events-auto">
        <button className="
          w-12 h-12 flex items-center justify-center
          rounded-full
          bg-gray-100/50 backdrop-blur-md
          border border-white/40
          hover:bg-white hover:scale-105
          transition-all duration-300
          text-gray-600
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        <button 
          onClick={onIndexClick}
          className="
            px-6 h-12 flex items-center justify-center
            rounded-full
            bg-gray-100/50 backdrop-blur-md
            border border-white/40
            hover:bg-white hover:scale-105
            transition-all duration-300
            text-xs font-light tracking-widest text-gray-800
          "
        >
          概要 (Index)
        </button>
      </div>
    </div>
  );
};

export default Controls;