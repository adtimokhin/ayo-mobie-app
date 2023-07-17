const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  // Add 'db' and 'ttf' extensions to assets and remove 'svg' extension
  const updatedAssetExts = [...assetExts, 'db', 'ttf'].filter(ext => ext !== 'svg');

  // Add 'svg' extension to source
  const updatedSourceExts = [...sourceExts, 'svg'];

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: updatedAssetExts,
      sourceExts: updatedSourceExts,
    },
  };
})();
