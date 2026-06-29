import { motion } from 'motion/react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } } as const;
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } } as const;

interface YardSaleProduct { id: string; name: string; price: number; image: string; description: string; visible: boolean; }

const products: YardSaleProduct[] = [
  {
    id: 'item-1782656159664',
    name: 'Stand-Tall Nautical Planter — One of a Kind Folk Art Original',
    price: 85,
    image: '/assets/tall boy 28in front.jpg',
    description: 'At nearly 2½ feet tall with a generous ~14in square top, this statement planter commands attention the moment it hits your porch, deck, or garden. Three hand-cut coastal motifs tell the story — a seahorse on the front greets every visitor, a starfish watches the left, and a scallop shell faces right — each one stained in rich nautical blue and built right into the cedar panels.\n\nThe trim carries that same deep blue, while the interior panels are finished in a soft nautical off-white that makes the whole piece pop. And here\'s the practical magic: with 12in of usable planter depth, you\'re not filling a 28in box — your soil sits right where it needs to be, and your plants sit up at the perfect show height.\n\nBuilt from naturally rot-resistant western red cedar with exterior-grade stains throughout, this planter is already ready to go — no finishing needed, no waiting. Just drop it in place, add your favorite plants, and let it do the talking.\n\nThis one won\'t be reproduced. It\'s a true folk art original, finished and ready for its forever home. See more angles in our gallery: https://seashorecedar.com/gallery',
    visible: true,
  },
  {
    id: 'item-1782656220054',
    name: 'Anglesea, North Wildwood, Wildwood & the Crest - Cutting Boards',
    price: 45,
    image: '/assets/Seaturtle_on_cutting_board.png',
    description: 'One-of-a-Kind Engraved Bamboo Cutting Boards — Sold as a Pair for $45 or individually at $30 & $20 (see image).\n\nTwo boards, two coastal stories — and once they\'re gone, they\'re gone for good. The larger board features a custom-engraved sea turtle alongside North Wildwood & Anglesea, while its companion celebrates Wildwood & The Crest with its own matching turtle design. Each one is laser-engraved into Vietnamese bamboo and finished with food-safe cutting board wax — ready to display, ready to use, and built to last.\n\nWhether they hang on a kitchen wall, anchor a charcuterie spread, or become the centerpiece of a beach house kitchen, these boards carry a little piece of the Five Mile Beach wherever they go. Truly one of a kind. Not reproducible. Yours if you move fast. See back side in our gallery: https://seashorecedar.com/gallery',
    visible: true,
  },
  {
    id: 'item-1782656283179',
    name: 'Limited Edition Patriotic Cedar Planter — 16in × 16in',
    price: 45,
    image: '/assets/GBA 2.png',
    description: 'America turns 250 this year, and we think that deserves more than a bumper sticker.\n\nThis 16in × 16in western red cedar planter is engraved with a bold American Flag and God Bless America — a one-of-a-kind piece made right here on the Jersey Shore to mark a once-in-a-lifetime milestone. Naturally rot-resistant cedar means it\'ll still be on your porch long after the fireworks fade.\n\nPlant it up in red, white, and blue for the Fourth, or let it stand on its own as a lasting tribute to the 250th Anniversary. Either way, it\'s a conversation starter from July 4th straight through to next summer. Treated with natural Tung Oil.\n\nLimited availability — made to celebrate, not to mass produce.',
    visible: true,
  },
  {
    id: 'item-1782656331345',
    name: 'Patriotic Cedar Planter — 16in × 16in | Artisan Second',
    price: 40,
    image: '/assets/GBA 1.png',
    description: 'Same bold American Flag and God Bless America laser engraving. Same naturally rot-resistant western red cedar. Same Jersey Shore craftsmanship — with one small story to tell.\n\nDuring engraving, the cedar did what cedar sometimes does — showed its character. A hairline grain split in the word America has been hand-stabilized with wood glue and sealed with tung oil to stop it in its tracks. You\'d have to know to look for it.\n\nWe could have quietly tossed it. Instead we\'re offering it at a discount because the piece is genuinely beautiful and a tiny natural quirk in the wood shouldn\'t keep it from finding a home.\n\nThis is a one-time deal on a one-of-a-kind piece. If you love the look but love a bargain more, this one\'s for you.',
    visible: true,
  },
  {
    id: 'item-1782741057299',
    name: 'Custom Engraved Philly Sport Teams Cedar Planter Box',
    price: 55,
    image: '/assets/3 Picket Flyers-Eagles.jpg',
    description: 'Condition: New\n(1) ~16x16x16 Cedar Planter Box w/ Custom Engraving of Eagles, Flyers, 76ers, and Phillies logos on sides. Shown without finishing oil but since has been treated with natural tung oil giving it a slightly darker, richer color and long term protection.  \n\nGreat for Philly sports lover to represent ever season throughout the year.  See next for other side. ',
    visible: true,
  },
  {
    id: 'item-1782741110718',
    name: 'Custom Engraved Philly Sport Teams Cedar Planter Box',
    price: 55,
    image: '/assets/3 Picket Phillies-76ers.jpg',
    description: 'This is the other side of the previous box with the Eagles & Flyers logos',
    visible: true,
  },
  {
    id: 'item-1782741159603',
    name: 'Custom Engraved Go Phils! Cedar Planter box',
    price: 50,
    image: '/assets/3 Picket Planter Phillies.jpg',
    description: '(1) ~16x16x16 w/ Phillies logo and "Go Phils!" engraving finished with Natural Tung Oil\n\nStart celebrating the Phillies as the go on a summer run!\n\nFlowers not included',
    visible: true,
  },
  {
    id: 'item-1782741217925',
    name: 'Custom Wildwood Engraved Planter Box',
    price: 45,
    image: '/assets/3-Picket-Planter-Wildwood-W.jpg',
    description: 'The Big "W" - Show off your Wildwood pride with this beauty!  \n\n(1)  ~16x16x16 w/ beautifully engraved Wildwood "W" logo and finished for long term protection with Linseed Oil  (great for flowers / not vegetables)\n\nFlowers not included.  \n\n',
    visible: true,
  }
];

function ProductCard({ product }: { product: YardSaleProduct }) {
  const orderParams = new URLSearchParams({ product: product.name, price: String(product.price) });
  return (
    <motion.div variants={fadeUp} className="flex flex-col rounded border border-border overflow-hidden" style={{ background: 'hsl(var(--background))' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">Yard Sale</span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading text-lg text-foreground mb-3" style={{ letterSpacing: '-0.01em' }}>{product.name}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
          {product.description.split('\n\n').map((para, i) => <p key={i} className={i > 0 ? 'mt-3' : ''}>{para}</p>)}
        </div>
        <div className="flex items-center justify-between py-3 px-4 rounded bg-muted mb-4">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-lg font-bold text-foreground">${product.price}</span>
        </div>
        <Link to={`/order?${orderParams.toString()}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Order — ${product.price} <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function YardSalePage() {
  return (
    <>
      <Helmet>
        <title>Yard Sale — Seashore Cedar</title>
        <meta name="description" content="Discounted items, seconds, and one-of-a-kind pieces at reduced prices from Seashore Cedar in Wildwood, NJ." />
      </Helmet>
      <section className="relative py-14 md:py-18 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/assets/background-header_WW.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/75 via-stone-900/55 to-stone-900/75" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={fadeUp} className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: 'hsl(var(--primary) / 0.9)' }}>Seashore Cedar</motion.p>
            <motion.h1 variants={fadeUp} className="font-heading text-4xl md:text-5xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>Yard Sale</motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-sm md:text-base">Discounted items, seconds &amp; one-of-a-kind pieces — while they last</motion.p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 md:py-24" style={{ background: 'hsl(var(--background))' }}>
        <div className="container mx-auto px-6">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {products.filter(p => p.visible).map(product => <ProductCard key={product.id} product={product} />)}
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
              Shop Full Price Items <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded font-semibold text-sm border border-border text-foreground hover:bg-muted transition-colors">
              <Mail size={15} /> Ask About Availability
            </Link>
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mt-6">Free local pickup · Wildwood, NJ · Local delivery Mon–Thu to select areas</p>
        </div>
      </section>
    </>
  );
}