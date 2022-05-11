module.exports = {
  webpack(config, env) {
    if (env === 'production') {
      // JS Overrides
      config.output.filename = 'static/js/[name][hash].js';
      config.output.chunkFilename = 'static/js/[name][hash].chunk.js';

      // CSS Overrides
      config.plugins[4].filename = 'static/css/[name].css';

      // // Media and Assets Overrides
      // config.module.rules[1].oneOf[0].options.name = 'static/media/[name].[ext]';
      // config.module.rules[1].oneOf[3].options.name = 'static/media/[name].[ext]';
    }
    // 04c01d36647679a4b9ba5.chunk
    // 036acb3296cfab5edbd49.chunk
    // 4.d71ffeae.chunk
    return config;
  },
};
