export interface SeoRoute {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  lastmod?: string;
}

export const seoRoutes: SeoRoute[] = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/products", changefreq: "weekly", priority: 0.8 },
  { path: "/cedar-cutouts", changefreq: "weekly", priority: 0.8 },
  { path: "/cement-beach-balls", changefreq: "weekly", priority: 0.8 },
  { path: "/custom-orders", changefreq: "monthly", priority: 0.7 },
  { path: "/gallery", changefreq: "weekly", priority: 0.7 },
  { path: "/about", changefreq: "monthly", priority: 0.6 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
];
