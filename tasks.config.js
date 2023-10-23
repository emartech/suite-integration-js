'use strict';

module.exports = {
  server: {
    runnable: 'fake-server/server.js'
  },
  client: {
    app: {
      target: 'dist/',
      buildPattern: [{
        pattern: 'client/app/!(*.spec).js',
        splitVendor: false
      }],
      testPattern: 'client/**/*.spec.js',
      testModules: [
        'client/setup-tests.spec.js'
      ],
      loaders: [
        { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['es2015'] } },
        { test: /\.js$/, loader: 'exports-loader', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'imports?define=>false', exclude: /node_modules/ },
        { test: /\.js$/, loader: 'imports-loader', exclude: /node_modules/ },
        { test: /\.json$/, loader: 'json-loader' }
      ]
    }
  },
  s3: {
    copyPattern: 'dist/**/*',
    withGzip: true
  }
};
