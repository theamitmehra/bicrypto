require('dotenv').config();

const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'en';
const configuredLocales = process.env.NEXT_PUBLIC_LANGUAGES
  ? process.env.NEXT_PUBLIC_LANGUAGES.split(',').map((lang) => lang.trim())
  : ['en'];

// Optional build-time override to limit locales in production deployments.
// Example: BUILD_LANGUAGES="en,hi"
const buildLocales = process.env.BUILD_LANGUAGES
  ? process.env.BUILD_LANGUAGES.split(',').map((lang) => lang.trim())
  : [];

const locales =
  process.env.NODE_ENV === 'production'
    ? buildLocales.length
      ? buildLocales
      : [defaultLocale]
    : configuredLocales;

module.exports = {
  i18n: {
    defaultLocale,
    locales,
  },
  debug: true,
  localePath: typeof window === 'undefined'
    ? require('path').resolve('./public/locales')
    : '/public/locales',
};
