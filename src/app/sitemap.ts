import { MetadataRoute } from 'next';
import { INITIAL_PRODUCTS, CATEGORIES_LIST } from '../data/initialData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stylr.in';

  const productRoutes = INITIAL_PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryRoutes = CATEGORIES_LIST.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const staticRoutes = [
    '',
    '/shop',
    '/about',
    '/contact',
    '/wishlist',
    '/cart',
    '/shipping-policy',
    '/returns-and-exchanges',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
