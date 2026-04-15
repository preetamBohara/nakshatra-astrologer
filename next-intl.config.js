import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'hi', 'ml', 'mr', 'pa', 'ta', 'te'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(en|hi|ml|mr|pa|ta|te)/:path*']
};