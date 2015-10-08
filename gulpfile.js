var gulp = require('gulp');
var concat = require('gulp-concat');
var stylus = require('gulp-stylus');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

var options = {
  javascript :
  { src : './src/client/**/*.js',
    dest : './dist'
  },
  styles :
  {
    src : './src/client/**/*.styl',
    dest : './dist'
  },
  index :
  {
    src : './src/client/index.html',
    dest : './dist'
  },
  serverapp : './src/server/app.js'

};

function buildJavascript() {
  gulp.src( options.javascript.src)
    .pipe( concat('tweeter.js') )
    .pipe( gulp.dest(options.javascript.dest) )
    .pipe( livereload() );
}

function buildStyles()
{
  gulp.src(options.styles.src)
    .pipe( stylus() )
    .pipe( concat('tweeter.css') )
    .pipe( gulp.dest(options.styles.dest) )
    .pipe( livereload() );
}

function buildIndex()
{
  gulp.src(options.index.src)
    .pipe( gulp.dest(options.index.dest) )
    .pipe( livereload() );
}

function watchJavascript()
{
  gulp.watch( options.javascript.src, ['build-javascript'] );

}

function watchStyles()
{
  gulp.watch( options.styles.src, ['build-styles']);
}

function watchIndex()
{
  gulp.watch( options.index.src, ['build-index']);
}

function anotherName()
{
  nodemon({
    'script': options.serverapp
  });
}

function startLiveReload() {
  livereload.listen();
}

gulp.task('build-javascript', buildJavascript);
gulp.task('build-styles', buildStyles);
gulp.task('build-index', buildIndex);

gulp.task('build', [
  'build-javascript',
  'build-styles',
  'build-index'
]);

gulp.task('start-livereload', startLiveReload);

gulp.task('watch-javascript', watchJavascript);
gulp.task('watch-styles', watchStyles);
gulp.task('watch-index', watchIndex);

gulp.task('serve', anotherName);

// Swapping these lines breaks things
//var runSequence = require('run-sequence');
//gulp.task('watch', runSequence(['start-livereload', 'watch-javascript', 'watch-styles', 'watch-index', 'serve']));
gulp.task('watch', ['start-livereload', 'watch-javascript', 'watch-styles', 'watch-index', 'serve']);

gulp.task('default', [
  'build-javascript',
  'build-styles',
  'build-index'
]);
