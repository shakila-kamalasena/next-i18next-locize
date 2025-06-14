// POSSIBILITY 1: locize live download usage on client side only
const LocizeBackend = require('i18next-locize-backend/cjs')
const ChainedBackend = require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

// If you've configured caching for your locize version, you may not need the i18next-localstorage-backend and i18next-chained-backend plugin.
// https://www.locize.com/docs/caching

const isBrowser = typeof window !== 'undefined'

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  debug: isDev,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
  },
  backend: {
    backendOptions: [{
      expirationTime: 60 * 60 * 1000 // 1 hour
    }, {
      projectId: "9617434f-44e6-4ab6-976e-3d5594128d90",
      apiKey: "d9584ca3-3cc3-4db8-865a-1cdd737d91d2",
      version: 'latest'
    }],
    backends: isBrowser ? [LocalStorageBackend, LocizeBackend] : [],
  },
  partialBundledLanguages: isBrowser && true,
  serializeConfig: false,
  use: isBrowser ?
    (isDev ? [ChainedBackend, /*require('locize').locizeEditorPlugin({ show: true }), require('locize-lastused')*/] : [ChainedBackend]) :
    (isDev ? [/*require('locize').locizeEditorPlugin({ show: true })*/] : []),
  // locizeLastUsed: {
  //   projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
  //   apiKey: 'myApiKey', // to not add the api-key in production
  //   version: 'latest',
  //   debounceSubmit: 10000
  // },
  saveMissing: isDev && isBrowser // do not set saveMissing to true for production and also not when using the chained backend
}

// POSSIBILITY 2: config for locize live download usage
// module.exports = {
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en', 'de'],
//   },
//   // this will download the translations from locize directly, in client (browser) and server (node.js)
//   // DO NOT USE THIS if having a serverless environment => this will generate too much download requests
//   //   => https://github.com/locize/i18next-locize-backend#important-advice-for-serverless-environments---aws-lambda-google-cloud-functions-azure-functions-etc
//   backend: {
//     projectId: 'd3b405cf-2532-46ae-adb8-99e88d876733',
//     // apiKey: 'myApiKey', // to not add the api-key in production, used for saveMissing feature
//     referenceLng: 'en'
//   },
//   use: [
//     require('i18next-locize-backend/cjs')
//   ],
//   ns: ['common', 'footer', 'second-page'], // the namespaces needs to be listed here, to make sure they got preloaded
//   serializeConfig: false, // because of the custom use i18next plugin
//   // debug: true,
//   // saveMissing: true, // do not saveMissing to true for production
// }

// POSSIBILITY 3: bundle translations with app
// for a serverless environment bundle the translations first. See downloadLocales script in package.json
// and configre this file like this:
// module.exports = {
//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en', 'de'],
//   }
// }
