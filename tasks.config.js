module.exports = {
  server: {
    runnable: 'fake-server/server.js'
  },
  client: {
    app: {
      target: 'dist/'
    }
  },
  s3: {
    copyPattern: 'dist/assets/**/*'
  }
};
