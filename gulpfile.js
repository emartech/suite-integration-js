
'use strict';

const gulp = require('gulp');
const runSequence = require('gulp4-run-sequence');
const tasksConfig = require('./tasks.config');
const clientTasks = require('boar-tasks-client').getTasks(gulp, tasksConfig);
const serverTasks = require('boar-tasks-server').getTasks(gulp, tasksConfig);

gulp.task('client-test', clientTasks.client.test);
gulp.task('client-code-style', function() { return clientTasks.client.codeStyle(); });

// Helper
gulp.task('build-clean', function(cb) {
  clientTasks.build.clean();
  cb();
});

gulp.task('build', gulp.series('build-clean', function(cb) {
  runSequence('client-build', cb);
}));

gulp.task('start', gulp.series('build', function(done) {
  runSequence('client-watch', 'start-fake-server', done);
}));

gulp.task('client-codestyle', function() { return clientTasks.client.codeStyle(); });

gulp.task('test', gulp.parallel(
  'client-test',
  'client-codestyle'
));

// Client Tasks
gulp.task('client-build-scripts', function(cb) { return clientTasks.client.buildScripts(cb); });
gulp.task('client-build-scripts-deny-errors', function() { return clientTasks.client.buildScriptsDenyErrors(); });
gulp.task('client-build', gulp.series(
  'client-build-scripts'
));
gulp.task('client-watch', function() {
  gulp.watch(clientTasks.config.client.app.watchPattern, ['client-build-scripts-deny-errors']);
});

gulp.task('deploy', clientTasks.build.deploy);

gulp.task('publish-s3', function(cb) { clientTasks.s3.publish(); cb(); });
gulp.task('publish-redirector', function(cb) { clientTasks.redirector.save(); cb(); });
gulp.task('publish', gulp.series('publish-s3', 'publish-redirector'));


gulp.task('start-fake-server', serverTasks.server.start);

gulp.task('default', gulp.series('start'));
