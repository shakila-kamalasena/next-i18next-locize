// import { InitOptions } from 'i18next';
// import LocizeBackend from 'i18next-locize-backend';

// const isBrowser = typeof window !== 'undefined';
// const isDev = process.env.NODE_ENV === 'development';

export const fallbackLng = 'en';
export const languages = [fallbackLng, 'de'];
export const defaultNS = 'common';

// export function getOptions(lng: string = fallbackLng, ns: string | string[] = defaultNS): InitOptions {
//   return {
//     debug: isDev,
//     supportedLngs: languages,
//     fallbackLng,
//     lng,
//     fallbackNS: defaultNS,
//     defaultNS,
//     ns,
//     backend: {
//       backendOptions: [{
//         expirationTime: 60 * 60 * 1000 // 1 hour
//       }, {
//         projectId: "9617434f-44e6-4ab6-976e-3d5594128d90",
//         version: 'latest'
//       }],
//       backends: isBrowser ? [LocizeBackend] : [],
//     },
//     partialBundledLanguages: isBrowser && true,
//     saveMissing: isDev && isBrowser
//   };
// }
