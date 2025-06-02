// POSSIBILITY 3: bundle translations with app
// for a serverless environment bundle the translations first. See downloadLocales script in package.json
// and configre this file like this:
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  }
}
