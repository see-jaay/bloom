const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');


const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
*/
const config = {
  /* general options */

  resolver: {
    /* resolver options */
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg']
  },
  transformer: {
    /* transformer options */
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  serializer: {
    /* serializer options */
  },
  server: {
    /* server options */
  },
  watcher: {
    /* watcher options */
    watchman: {
      /* Watchman-specific options */
    }
  }
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);


// module.exports = (() => {
//   // const config = getDefaultConfig(__dirname);
//   const config = {};
//   const { resolver, transformer, serializer, server, watcher } = config;

//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
//     sourcExts: [...resolver.sourcExts, "svg"],
//   };
//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve("react-native-svg-transformer"),
//   };
// })