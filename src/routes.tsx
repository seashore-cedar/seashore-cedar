import { RouteObject } from 'react-router-dom';
import HomePage from './pages/index';
import ProductsPage from './pages/products';
import CedarCutoutsPage from './pages/cedar-cutouts';
import CementBeachBallsPage from './pages/cement-beach-balls';
import ContactPage from './pages/contact';
import GalleryPage from './pages/gallery';
import CustomOrdersPage from './pages/custom-orders';
import AboutPage from './pages/about';
import OrderPage from './pages/order';
import ProdNotFoundPage from './pages/_404';
import AllProductsPage from './pages/all-products';
import ArtisanEpoxyPage from './pages/artisan-epoxy';
import YardSalePage from './pages/yard-sale';

export const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/cedar-cutouts', element: <CedarCutoutsPage /> },
  { path: '/cement-beach-balls', element: <CementBeachBallsPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/custom-orders', element: <CustomOrdersPage /> },
  { path: '/order', element: <OrderPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/all-products', element: <AllProductsPage /> },
  { path: '/artisan-epoxy', element: <ArtisanEpoxyPage /> },
  { path: '/yard-sale', element: <YardSalePage /> },
  { path: '*', element: <ProdNotFoundPage /> },
];

export type Path = '/' | '/products' | '/cedar-cutouts' | '/cement-beach-balls' | '/contact' | '/gallery' | '/custom-orders' | '/order' | '/about';
export type Params = Record<string, string | undefined>;
