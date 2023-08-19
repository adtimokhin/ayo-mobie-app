// Version One
// const { getDefaultConfig } = require("metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//   } = await getDefaultConfig(__dirname);

//   // Add 'db' and 'ttf' extensions to assets and remove 'svg' extension
//   const updatedAssetExts = [...assetExts, "db", "ttf"].filter(
//     (ext) => ext !== "svg"
//   );

//   // Add 'svg' extension to source
//   const updatedSourceExts = [...sourceExts, "svg", "cjs"];

//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: false,
//         },
//       }),
//     },
//     resolver: {
//       assetExts: updatedAssetExts,
//       sourceExts: updatedSourceExts,
//     },
//   };
// })();

// Version Two
// const { getDefaultConfig } = require("@expo/metro-config");

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts },
//     transformer,
//   } = await getDefaultConfig(__dirname);

//   // Customize your asset and source extensions here
//   const updatedAssetExts = [...assetExts, "db", "ttf"].filter(
//     (ext) => ext !== "svg"
//   );
//   const updatedSourceExts = [...sourceExts, "svg", "cjs"];

//   return {
//     ...transformer,
//     assetExts: updatedAssetExts,
//     sourceExts: updatedSourceExts,
//   };
// })();

// Version Three
// const { getDefaultConfig } = require("@expo/metro-config");

// const config = getDefaultConfig(__dirname);

// config.resolver.assetExts.push(
//   // Adds support for `.db` files for SQLite databases
//   "svg"
// );

// module.exports = config;

// Version Four
const { getDefaultConfig } = require("@expo/metro-config");

module.exports = (async () => {
  const config = getDefaultConfig(__dirname);

  // Add 'svg' and 'ttf' extensions to assetExts
  config.resolver.assetExts.push("ttf");
  config.resolver.sourceExts.push('cjs');

  return config;
})();
