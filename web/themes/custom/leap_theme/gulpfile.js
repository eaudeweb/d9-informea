let gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  browsersync = require('browser-sync').create(),
  svgSprite = require('gulp-svg-sprite');


const paths = {
  scss: {
    src: './scss/style.scss',
    dest: './css',
    watch: './scss/**/*.scss',
    bootstrap: './node_modules/bootstrap/scss/bootstrap.scss'
  },
  ckeditor: {
    src: './scss/ckeditor_style.scss',
    dest: './css',
  },
  js: {
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    jquery: './node_modules/jquery/dist/jquery.min.js',
    popper: 'node_modules/popper.js/dist/umd/popper.min.js',
    dest: './js'
  },
  images: {
    src: './images/**/*.svg',
    dest: './assets'
  },
  twig: {
    src: './templates/**/*.twig'
  }
};

// SVG Sprite configuration
const spriteConfig = {
  shape: {
    dimension: { // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32
    }
  },
  mode: {
    symbol: { // Activate the «symbol» mode
    }
  }
};

// Compile sass into CSS & auto-inject into browsers
function styles () {
  return gulp.src([paths.scss.bootstrap, paths.scss.src, paths.ckeditor.src])
    .pipe(sourcemaps.init())
    .pipe(sass({
      'includePaths': ['node_modules'],
    })
    .on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: [
        'Chrome >= 35',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 8',
        'Safari >= 8',
        'Android 2.3',
        'Android >= 4',
        'Opera >= 12']
    })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(gulp.dest(paths.ckeditor.dest))
    // .pipe(cleanCss())
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(gulp.dest(paths.scss.dest))
    .pipe(browsersync.stream());
}

// Move the javascript files into our js folder
function js () {
  return gulp.src([paths.js.bootstrap, paths.js.jquery, paths.js.popper])
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browsersync.stream());
}

// Generate svg sprite
function sprite() {
  return gulp.src(paths.images.src)
    .pipe(svgSprite(spriteConfig))
    .pipe(gulp.dest(paths.images.dest));
}

// BrowserSync
function browserSync() {
  browsersync.init({
    proxy: 'leap.local'
  });
}

// BrowserSync Reload
function browserSyncReload() {
  browsersync.reload();
}

// Static Server + watching scss/html files
function serve () {
  browserSync();

  gulp.watch([paths.scss.watch, paths.scss.bootstrap], styles);
    // .on('change', browserSyncReload);
  gulp.watch([paths.images.src], sprite).on('change', browserSyncReload);
  // gulp.watch([paths.twig.src]).on('change', browserSyncReload);
}

const build = gulp.series(styles, sprite, gulp.parallel(js, serve));

exports.styles = styles;
exports.js = js;
exports.serve = serve;

exports.default = build;
