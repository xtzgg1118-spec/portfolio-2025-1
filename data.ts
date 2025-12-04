import { Project, NavigationItem } from './types';

// Categories:
// 0-1: Workshops
// 2-3: Artworks
// 4-5: Collaborative Projects

export const PROJECTS: Project[] = [
  // --- WORKSHOPS (Index 0, 1) ---
  {
    id: 1,
    title: "Paper Dimensions",
    category: "Workshop",
    year: "2024",
    client: "Orenji Studio",
    description: "A delicate exploration of paper textures and light. This series constructs ethereal bird forms and organic plant structures using only white and colored paper, playing with translucency and shadow to create depth.",
    coverImage: "https://images.unsplash.com/photo-1578320606737-14227915520e?q=80&w=1200&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1578320606737-14227915520e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1600&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Material Logic",
    category: "Workshop",
    year: "2024",
    client: "Academic",
    description: "An intensive workshop focusing on the physical properties of design materials. Students explored structural integrity through folding and joinery without adhesives.",
    coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600&auto=format&fit=crop"
    ]
  },

  // --- ARTWORKS (Index 2, 3) ---
  {
    id: 3,
    title: "Sand & Cactus",
    category: "Artwork",
    year: "2024",
    client: "Diptyque",
    description: "Conceptual product photography and set design featuring abstract organic forms and sand textures. A visual dialogue between the artificial and the natural.",
    coverImage: "https://images.unsplash.com/photo-1534269222346-5a896154c41d?q=80&w=1200&auto=format&fit=crop", 
    images: [
      "https://images.unsplash.com/photo-1534269222346-5a896154c41d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507937747732-c6252994e637?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Paper Flora",
    category: "Artwork",
    year: "2023",
    client: "Vogue",
    description: "Large scale floral installation using recycled materials. A commentary on consumption and beauty.",
    coverImage: "https://images.unsplash.com/photo-1516205651411-a42711ac5516?q=80&w=1200&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1516205651411-a42711ac5516?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1695663363372-138379ba5188?q=80&w=1600&auto=format&fit=crop"
    ]
  },

  // --- COLLABORATIVE PROJECTS (Index 4, 5) ---
  {
    id: 5,
    title: "Silent Noise",
    category: "Collaboration",
    year: "2022",
    client: "Personal",
    description: "Capturing the quiet moments in the busiest cities of the world. A study of isolation within the crowd.",
    coverImage: "https://images.unsplash.com/photo-1449824913929-4bba42b89567?q=80&w=1200&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1449824913929-4bba42b89567?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    title: "Minimalist Void",
    category: "Collaboration",
    year: "2023",
    client: "Aesop",
    description: "The absence of objects as a design feature. Creating space for thought.",
    coverImage: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1600&auto=format&fit=crop"
    ]
  }
];

export const NAV_ITEMS: NavigationItem[] = [
  { 
    id: "workshops",
    label: "ワークショップ", 
    type: "page",
    slideIndex: 0, 
    content: {
      title: "Workshops",
      body: "Our workshops are designed to foster creativity and technical skills. From paper crafting to digital set design, we offer intensive courses for all levels."
    }
  }, 
  { 
    id: "artworks",
    label: "アートワーク", 
    type: "page",
    slideIndex: 2, 
    content: {
      title: "Artworks",
      body: "A collection of personal and commissioned pieces exploring material, light, and composition."
    }
  }, 
  { 
    id: "collaborative",
    label: "チームワーク", 
    type: "page",
    slideIndex: 4, 
    content: {
      title: "Collaborative Projects",
      body: "Joint ventures with architects, designers, and brands to create immersive experiences."
    }
  }
];

export const INDEX_PAGE: NavigationItem = {
    id: "index",
    label: "概要",
    type: "page",
    content: {
        title: "Index",
        body: "Glass Dimension is a curated portfolio exploring the intersection of physical craft and digital presentation.\n\nKey Areas:\n- Workshops\n- Artworks\n- Collaborative Projects\n\nThis platform serves as a living archive of our experiments with light, texture, and space."
    }
};