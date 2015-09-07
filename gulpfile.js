'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var config = require('./tasks.config');
var tasks = require('boar-tasks').getTasks(gulp, config);

gulp.task('default', ['start']);

gulp.task('build', ['build-clean'], function(cb) {
  runSequence(['client-build'], cb);
});

gulp.task('start', ['build'], function(done) {
  runSequence(['client-watch', 'package-watch', 'start-fake-server'], done);
});

gulp.task('test', [
  'client-test',
  'client-jshint',
  'code-style'
]);

// Helper
gulp.task('build-clean', function(cb) {
  tasks.build.clean(cb);
});

gulp.task('code-style', ['client-code-style', 'client-jshint']);
gulp.task('client-code-style', function() { return tasks.client.codeStyle(); });

// Client Tasks
gulp.task('client-build', [
  'client-build-scripts'
]);
gulp.task('client-build-scripts', function() { return tasks.client.buildScripts(); });
gulp.task('client-build-scripts-deny-errors', function() { return tasks.client.buildScriptsDenyErrors(); });
gulp.task('client-jshint', function() { return tasks.client.jshint(); });

gulp.task('client-watch', function() {
  gulp.watch(tasks.config.client.app.watchPattern, ['client-build-scripts-deny-errors']);
});

gulp.task('client-test', tasks.client.test);

gulp.task('package-watch', function() { tasks.package.watch(); });

gulp.task('deploy', tasks.build.deploy);

var revision;
gulp.task('publish', function(cb) {
  runSequence(['publish-init', 'publish-s3', 'publish-redirector'], cb);
});
gulp.task('publish-init', function() { revision = Math.round(Date.now() / 1000); });
gulp.task('publish-s3', function() { return tasks.s3.publish(revision); });
gulp.task('publish-redirector', function() { return tasks.redirector.save(revision); });

gulp.task('start-fake-server', tasks.server.start);
