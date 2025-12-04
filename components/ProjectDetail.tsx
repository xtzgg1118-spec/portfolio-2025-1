import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X } from 'lucide-react';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!project) return null;

  // Real images from the project
  const realImages = [project.coverImage, ...project.images.filter(img => img !== project.coverImage)];

  // Generate a grid of 30 items as requested (rows: ~5-6, cols: 6)
  // We use real images where available, and placeholders for the rest to reserve space.
  const totalSlots = 30;
  const gridItems = Array.from({ length: totalSlots }, (_, i) => {
    return realImages[i % realImages.length]; // Cycle through real images for demo, or use undefined for blank
  });

  // Logic for the close button
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showInfo) {
      setShowInfo(false);
    } else {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      {/* --- HEADER (Preserved completely) --- */}
      <div className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-[120] pointer-events-none">
        
        {/* Toggle Info Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
          className="pointer-events-auto px-6 py-2.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-md text-[11px] font-bold tracking-[0.1em] text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm"
        >
          {showInfo ? '閉じる' : '作品について'}
        </button>

        {/* Close Button (X) */}
        <button 
          onClick={handleClose}
          className="pointer-events-auto w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 bg-white/80 backdrop-blur-md hover:bg-black hover:text-white hover:border-black transition-all duration-300 group shadow-sm"
        >
          <X size={20} className="text-gray-900 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* --- INFO OVERLAY --- */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[110] bg-white/25 backdrop-blur-xl flex flex-col items-center justify-center p-8 md:p-16 text-center cursor-zoom-out"
            onClick={() => setShowInfo(false)}
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="max-w-2xl w-full flex flex-col items-start pointer-events-auto cursor-default bg-white/40 p-10 md:p-16 rounded-sm shadow-sm border border-white/50 text-left"
              onClick={(e) => e.stopPropagation()}
            >
               <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2 tracking-tight">
                  {project.title}
               </h1>
               
               <div className="flex gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">
                  <span>{project.year}</span>
                  <span className="text-gray-300">|</span>
                  <span>{project.category}</span>
               </div>

               <div className="space-y-4">
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Technique</div>
                 <p className="text-sm text-gray-700 font-medium">
                    Digital Photography / Set Design / AI Assisted Composition
                 </p>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-300/30 w-full">
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Description</div>
                 <p className="text-sm md:text-base text-gray-800 font-light leading-relaxed">
                    {project.description}
                 </p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- GALLERY GRID CONTENT --- */}
      <div className="w-full min-h-screen bg-white">
         <div className="w-full pt-32 pb-32 px-4 md:px-8">
             
             {/* 
                Updated Grid Layout:
                - columns: auto-fit with minmax(140px, 1fr) for compact thumbnails
                - gap: 64px (gap-16) for large spacing
                - items-start: ensures grid items don't stretch vertically to match neighbors, avoiding gray space
             */}
             <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-16 items-start">
                {gridItems.map((imgUrl, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "10%" }}
                    transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
                    // Removed bg-gray-50 and any fixed height classes.
                    className="group cursor-zoom-in relative overflow-hidden"
                    onClick={() => setSelectedImage(imgUrl)}
                  >
                    {imgUrl ? (
                        <>
                            <img 
                              src={imgUrl} 
                              alt={`${project.title} - ${idx + 1}`} 
                              // Image follows natural aspect ratio: w-full, h-auto
                              className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            {/* Overlay matches the image size naturally because container wraps image */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                        </>
                    ) : (
                        /* Placeholder still needs an aspect ratio since it has no intrinsic size */
                        <div className="w-full aspect-[3/4] flex items-center justify-center bg-gray-50 text-gray-300">
                            <span className="text-[10px] uppercase tracking-widest">Asset {idx + 1}</span>
                        </div>
                    )}
                  </motion.div>
                ))}
             </div>

             {/* Footer */}
             <div className="mt-32 text-center opacity-30 hover:opacity-100 transition-opacity duration-500">
                <div className="inline-block w-1 h-12 bg-gray-300 mb-4"></div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">End of Collection</p>
             </div>
         </div>
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            {/* Lightbox Close */}
            <button 
              className="absolute top-6 right-6 p-4 text-gray-400 hover:text-black transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={1} />
            </button>

            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              src={selectedImage} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain shadow-sm cursor-default"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default ProjectDetail;