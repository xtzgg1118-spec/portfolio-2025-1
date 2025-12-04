import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { Project } from '../types';

interface GalleryProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  targetSlideIndex: number | null;
  onScrollComplete: () => void;
}

// Layout Configuration
const GAP_X = 200; // Decreased from 260 for tighter spacing
const GAP_Y = 70;   
const Z_DEPTH = 250; 
const SECTION_GAP = 60; // Decreased from 90

// Define the starting indices for sections (Workshops: 0, Artworks: 2, Collaborative: 4)
// This should match the NAV_ITEMS in data.ts
const SECTION_START_INDICES = [0, 2, 4];

const Gallery: React.FC<GalleryProps> = ({ projects, onSelect, targetSlideIndex, onScrollComplete }) => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const xDrag = useMotionValue(0);
  
  // Smooth physics
  const springConfig = { stiffness: 100, damping: 20, mass: 1 };
  const smoothIndex = useSpring(0, springConfig);

  // Sync state when smoothIndex settles
  useEffect(() => {
    const unsubscribe = smoothIndex.on("change", (v) => {
       // Logic to check if we are close to target could go here
    });
    return unsubscribe;
  }, [smoothIndex]);

  // Handle external scroll target (from Buttons)
  useEffect(() => {
    if (targetSlideIndex !== null) {
      setIndex(targetSlideIndex);
      onScrollComplete();
    }
  }, [targetSlideIndex, onScrollComplete]);

  useEffect(() => {
    smoothIndex.set(index);
  }, [index, smoothIndex]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Scroll Down/Right -> Next Content
      const delta = e.deltaY * 0.002;
      setIndex((prev) => {
          const next = prev + delta;
          return next;
      });
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (el) el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleDragEnd = () => {
    const x = xDrag.get();
    const velocity = x * -0.003; 
    setIndex(prev => prev + velocity);
    xDrag.set(0);
  };

  const getCircularProject = (i: number) => {
    const n = projects.length;
    const circularIndex = ((Math.floor(i) % n) + n) % n;
    return projects[circularIndex];
  };

  // --- POSITIONING LOGIC ---
  
  // Helper to calculate the absolute X position of a card index (0, 1, 2...)
  // accounting for section gaps.
  const getPositionForIndex = (i: number) => {
    // Count how many section breaks are before or at this index
    // We assume index 0 doesn't need a gap before it.
    let sectionBreaks = 0;
    for (const startIdx of SECTION_START_INDICES) {
        if (i >= startIdx && startIdx > 0) {
            sectionBreaks++;
        }
    }
    return (i * GAP_X) + (sectionBreaks * SECTION_GAP);
  };

  // Interpolated position for floating point index (camera position)
  const getInterpolatedPosition = (val: number) => {
      const lower = Math.floor(val);
      const upper = Math.ceil(val);
      const ratio = val - lower;
      const posLower = getPositionForIndex(lower);
      const posUpper = getPositionForIndex(upper);
      return posLower + (posUpper - posLower) * ratio;
  };

  const visibleRange = [-2, 7]; 
  const renderIndices = [];
  const baseIndex = Math.floor(index);
  for (let i = visibleRange[0]; i <= visibleRange[1]; i++) {
    renderIndices.push(baseIndex + i);
  }

  // --- DIVIDERS ---
  const dividers = SECTION_START_INDICES.filter(i => i > 0).map(i => {
      const prevPos = getPositionForIndex(i - 1);
      const currPos = getPositionForIndex(i);
      return {
          id: `div-${i}`,
          x: (prevPos + currPos) / 2,
          index: i
      };
  });

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ perspective: '2000px' }} 
    >
      {/* Invisible Drag Overlay */}
      <motion.div
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.01}
        style={{ x: xDrag }}
        onDrag={(e, info) => {
             setIndex(prev => prev - (info.delta.x * 0.002));
        }}
        onDragEnd={handleDragEnd}
      />

      {/* 3D Scene Container */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center transform-style-3d pointer-events-none"
        style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
      >
        {/* Render Cards */}
        {renderIndices.map((virtualIndex) => {
          const project = getCircularProject(virtualIndex);
          if (!project) return null;
          
          return (
            <GalleryCard
              key={`card-${virtualIndex}`}
              virtualIndex={virtualIndex}
              smoothIndex={smoothIndex}
              project={project}
              absoluteX={getPositionForIndex(virtualIndex)}
              getCameraPos={getInterpolatedPosition}
              onSelect={() => onSelect(project)}
            />
          );
        })}

        {/* Render Dividers */}
        {dividers.map(div => (
            <Divider 
                key={div.id}
                absoluteX={div.x}
                smoothIndex={smoothIndex}
                getCameraPos={getInterpolatedPosition}
            />
        ))}

      </motion.div>
    </div>
  );
};

// --- SUBCOMPONENTS ---

const Divider: React.FC<{
    absoluteX: number;
    smoothIndex: MotionValue<number>;
    getCameraPos: (v: number) => number;
}> = ({ absoluteX, smoothIndex, getCameraPos }) => {
    const x = useTransform(smoothIndex, (v) => {
        const cam = getCameraPos(v);
        return absoluteX - cam;
    });

    const z = useTransform(smoothIndex, (v) => {
        const cam = getCameraPos(v);
        const dist = (absoluteX - cam) / GAP_X; 
        return -dist * Z_DEPTH;
    });
    
    const y = useTransform(smoothIndex, (v) => {
        const cam = getCameraPos(v);
        const dist = (absoluteX - cam) / GAP_X; 
        return -dist * GAP_Y;
    });

    const rotateY = -25;
    const opacity = useTransform(smoothIndex, (v) => {
        const cam = getCameraPos(v);
        const dist = (absoluteX - cam) / GAP_X;
        if (dist < -2 || dist > 6) return 0;
        return 1 - (Math.abs(dist - 1.5) * 0.3); // Fade out at edges
    });

    return (
        <motion.div
            style={{
                position: 'absolute',
                width: '2px',
                height: '120px',
                backgroundColor: '#ccc',
                x, y, z, rotateY, opacity,
                transformStyle: 'preserve-3d',
            }}
            className="pointer-events-none"
        />
    );
};

const GalleryCard: React.FC<{
  virtualIndex: number;
  smoothIndex: MotionValue<number>;
  project: Project;
  absoluteX: number;
  getCameraPos: (v: number) => number;
  onSelect: () => void;
}> = ({ virtualIndex, smoothIndex, project, absoluteX, getCameraPos, onSelect }) => {
  
  const x = useTransform(smoothIndex, (v) => {
      return absoluteX - getCameraPos(v);
  });

  const distIndex = useTransform(x, (currentX) => currentX / GAP_X);

  const y = useTransform(distIndex, (val) => -val * GAP_Y); 
  const z = useTransform(distIndex, (val) => -val * Z_DEPTH); 
  
  const rotateX = 0; 
  const rotateY = -25;

  const opacity = useTransform(distIndex, (val) => {
    if (val < -3 || val > 8) return 0;
    return 1 - (Math.abs(val - 2) * 0.15); 
  });

  const zIndex = Math.round(1000 - virtualIndex);
  
  const [isHovered, setHovered] = useState(false);

  return (
    <motion.div
      style={{
        width: 'auto',
        height: 'auto',
        x,
        y,
        z,
        rotateX,
        rotateY,
        opacity,
        zIndex,
        position: 'absolute',
        transformStyle: 'preserve-3d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="group pointer-events-auto"
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={{
          x: isHovered ? 40 : 0, 
          z: isHovered ? 80 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative bg-transparent"
      >
          <img
            src={project.coverImage}
            alt={project.title}
            className="
                w-auto h-auto 
                max-w-[380px] max-h-[500px] 
                object-contain 
                block 
                shadow-2xl
            "
            style={{
                boxShadow: isHovered 
                ? '40px 15px 60px rgba(0,0,0,0.3)' 
                : '15px 10px 30px rgba(0,0,0,0.15)',
            }}
            draggable={false}
          />
          {/* Subtle overlay for hover effect - masked to image logic is complex with box-shadow, so keeping it simple or removing if it causes gray box. Removing for pure image look. */}
      </motion.div>
    </motion.div>
  );
};

export default Gallery;