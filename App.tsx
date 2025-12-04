import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import ProjectDetail from './components/ProjectDetail';
import PageDetail from './components/PageDetail';
import { PROJECTS } from './data';
import { Project, NavigationItem } from './types';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedPage, setSelectedPage] = useState<NavigationItem | null>(null);
  const [targetSlideIndex, setTargetSlideIndex] = useState<number | null>(null);

  const handleMenuClick = (item: NavigationItem) => {
    // If the item has a slideIndex, scroll the gallery to that position
    if (typeof item.slideIndex === 'number') {
      setTargetSlideIndex(item.slideIndex);
    } 
    // If it's a contact link or other page type, we can still show the detail or do nothing
    else if (item.type === 'page') {
      setSelectedPage(item);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white text-gray-900">
      {/* Clean, high-key background for art gallery feel */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-transparent to-gray-100 opacity-60" />
      
      <Menu onItemClick={handleMenuClick} />
      
      <main className="w-full h-full relative z-10">
        <Gallery 
          projects={PROJECTS} 
          onSelect={(project) => setSelectedProject(project)}
          targetSlideIndex={targetSlideIndex}
          // Important: Reset target after it's passed to gallery to allow manual scrolling afterwards
          onScrollComplete={() => setTargetSlideIndex(null)}
        />
      </main>

      {/* Subtle Hint Text */}
      <div className="fixed bottom-8 right-8 z-20 pointer-events-none select-none">
        <div className="px-4 py-2 rounded-full bg-white/40 backdrop-blur-sm">
            <span className="text-[10px] text-gray-400 tracking-[0.2em] font-light">
              スライドしてプレビュー
            </span>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPage && (
          <PageDetail 
            page={selectedPage} 
            onClose={() => setSelectedPage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;