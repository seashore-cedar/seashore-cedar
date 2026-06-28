// ─── Gallery Data ─────────────────────────────────────────────────────────────
// Single source of truth for gallery photos. Both the public Gallery page
// (src/pages/gallery.tsx) and the admin panel (src/pages/admin.tsx) import
// this same array, so they always stay in sync.
//
// TO ADD / EDIT / REMOVE PHOTOS:
// 1. Go to /admin → Gallery tab and make your changes
// 2. Click "Save & Download" (or "Export All")
// 3. Open the downloaded ADMIN_gallery.ts file
// 4. Copy its galleryItems array and paste it in below, replacing the array
//    in THIS file (src/data/galleryItems.ts)
// 5. Save, commit, push to GitHub — Render will redeploy automatically
//
// Photos with visible: false stay in this file (so you don't lose the data)
// but are hidden from the live gallery page.

export type GalleryCategory = 'Planter Boxes' | 'Cedar Cutouts' | 'Cement Beach Balls' | 'Details';

export interface GalleryItem {
  id: string;
  slot: string;
  alt: string;
  category: GalleryCategory;
  caption: string;
  visible?: boolean;
  link?: string;
  linkLabel?: string;
  span?: 'wide' | 'tall' | 'normal';
}

export const galleryItems: GalleryItem[] = [
  { id: 'gallery-1', slot: '/assets/Boxes ABC w dimensions.png', alt: 'Box ABC Set — three graduated cedar planters', category: 'Planter Boxes', caption: 'Box ABC Set — three graduated cedar planters', visible: true },
  { id: 'gallery-2', slot: '/assets/Box H.png', alt: 'Box H — tall long-format cedar planter', category: 'Planter Boxes', caption: 'Box H — tall long-format cedar planter', visible: true },
  { id: 'gallery-3', slot: '/assets/Box G.png', alt: 'Box G — wide cedar planter', category: 'Planter Boxes', caption: 'Box G — wide cedar planter', visible: true },
  { id: 'gallery-4', slot: '/assets/BB-16Inch.png', alt: '16" cement beach ball', category: 'Cement Beach Balls', caption: '16" cement beach ball', visible: false },
  { id: 'gallery-5', slot: '/assets/customengraved2.png', alt: 'Custom cedar engraving', category: 'Cedar Cutouts', caption: 'Custom cedar engraving', visible: false },
  { id: 'gallery-6', slot: '/assets/customengraved.png', alt: 'Personalized engraved cutting board', category: 'Cedar Cutouts', caption: 'Personalized engraved cutting board', visible: false },
  { id: 'gallery-7', slot: '/assets/Box M w dimensions.png', alt: 'Box M — compact cedar planter', category: 'Planter Boxes', caption: 'Box M — compact cedar planter', visible: true },
  { id: 'gallery-8', slot: '/assets/Box Q.png', alt: 'Box Q — tabletop cedar planter', category: 'Planter Boxes', caption: 'Box Q — tabletop cedar planter', visible: true },
  { id: 'gallery-9', slot: '/assets/Glued_Joints.png', alt: 'Handcrafted cedar joinery', category: 'Details', caption: 'Handcrafted cedar ', visible: false },
  { id: 'gallery-1781444686083', slot: '/assets/3-Picket-Planter-Wildwood-W.jpg', alt: 'Box A - Wildwood Logo - Boiled Linseed Oil Finish ', category: 'Planter Boxes', caption: 'Box A - Wildwood Logo - Boiled Linseed Oil Finish ', visible: true },
  { id: 'gallery-1781483688339', slot: '/assets/3 Picket Planter Phillies.jpg', alt: 'Box A - Go Phils! - Natural Oil (Tung)', category: 'Planter Boxes', caption: 'Box A - Go Phils! - Natural Oil (Tung)', visible: true },
  { id: 'gallery-1781616367032', slot: '/assets/3 Picket Flyers-Eagles.jpg', alt: '4 sided Philly Sports Teams Planter (Flyers Eagles Side) - No Finish', category: 'Planter Boxes', caption: '4 sided Philly Sports Teams Planter (Flyers Eagles Side) - No Finish', visible: true },
  { id: 'gallery-1781616597087', slot: '/assets/3 Picket Phillies-76ers.jpg', alt: '4 sided Philly Sports Teams Planter (Phillies 76ers Side) - No Finish', category: 'Planter Boxes', caption: '4 sided Philly Sports Teams Planter (Phillies 76ers Side) - No Finish', visible: true },
  { id: 'gallery-1781616695317', slot: '/assets/3 Picket Phillies.jpg', alt: '4 sided Philly Sports Teams Planter (Phillies side) - No Finish', category: 'Planter Boxes', caption: '4 sided Philly Sports Teams Planter (Phillies side) - No Finish', visible: true },
  { id: 'gallery-1781616743092', slot: '/assets/3 Picket Eagles.jpg', alt: '4 sided Philly Sports Teams Planter (Eagles side) - No Finish', category: 'Planter Boxes', caption: '4 sided Philly Sports Teams Planter (Eagles side) - No Finish', visible: true },
  { id: 'gallery-1781616772310', slot: '/assets/3 Picket Flyers.jpg', alt: '4 sided Philly Sports Teams Planter (Flyers side) - No Finish', category: 'Planter Boxes', caption: '4 sided Philly Sports Teams Planter (Flyers side) - No Finish', visible: true },
  { id: 'gallery-1781616813045', slot: '/assets/3 Picket 76ers.jpg', alt: '4 sided Philly Sports Teams Planter (76ers side) - No Finish', category: 'Planter Boxes', caption: '4 sided Philly Sports Teams Planter (76ers side) - No Finish', visible: true },
  { id: 'gallery-1782571052571', slot: '/assets/tall boy 28in front.jpg', alt: 'Front side of our Seahorse Tall Boy 28.5"H x 14 Square top, Exterior stained and Custom Cutouts attached', category: 'Planter Boxes', caption: 'Front side of our Seahorse Tall Boy 28.5"H x 14 Square top, Exterior stained and Custom Cutouts attached', visible: true },
  { id: 'gallery-1782571162527', slot: '/assets/tall boy 28in L side.jpg', alt: 'Left side of our Seahorse Tall Boy 28.5"H x 14 Square top, Exterior stained and Custom Cutouts attached', category: 'Planter Boxes', caption: 'Left side of our Seahorse Tall Boy 28.5"H x 14 Square top, Exterior stained and Custom Cutouts attached', visible: true },
  { id: 'gallery-1782571306589', slot: '/assets/tall boy 28in R side.jpg', alt: 'Left side of our Seahorse Tall Boy 28.5"H x 14 Square top, Exterior stained and Custom Cutouts attached', category: 'Planter Boxes', caption: 'Left side of our Seahorse Tall Boy 28.5"H x 14 Square top, Exterior stained and Custom Cutouts attached', visible: true },
  { id: 'gallery-1782655654287', slot: '/assets/GBA 2.png', alt: 'Limited Edition Patriotic Cedar Planter — 16in × 16in', category: 'Planter Boxes', caption: 'Limited Edition Patriotic Cedar Planter — 16in × 16in', visible: true },
  { id: 'gallery-1782655764697', slot: '/assets/Seaturtle_on_cutting_board.png', alt: 'One-of-a-Kind Engraved Bamboo Cutting Boards ', category: 'Details', caption: 'One-of-a-Kind Engraved Bamboo Cutting Boards ', visible: true },
  { id: 'gallery-1782655870124', slot: '/assets/Seaturtle_cutting_side_back.png', alt: 'Engraved Bamboo Cutting Boards - Back (Cutting) Side', category: 'Planter Boxes', caption: 'Engraved Bamboo Cutting Boards - Back (Cutting) Side', visible: true },
];