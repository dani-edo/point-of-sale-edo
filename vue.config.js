module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'warung-mbok-soinem',
    themeColor: '#3bbcd4',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}