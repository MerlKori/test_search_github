// подключаем модули
var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefixer    = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    gcmq        = require('gulp-group-css-media-queries'),
    clean       = require('gulp-clean'),
    csso        = require('gulp-csso'),
    useref      = require('gulp-useref'),
    uglify      = require('gulp-uglify'),
    gulpIf      = require('gulp-if'),
    rimraf      = require('rimraf'),
    htmlmin     = require('gulp-htmlmin');


// компилятор sass
gulp.task('sass', function () {
  return gulp.src(['./app/sass/*.scss' , './app/sass/**/*.sass']) 
    .pipe(sass.sync().on('error', sass.logError)) 
    .pipe(prefixer({
            browsers: ['last 3 versions'],
        }))
    .pipe(gulp.dest('app/css/')) 
    .pipe(browserSync.reload({stream: true}))
});
 
// автоматическое обновление страницы
gulp.task('browser-sync', function() {
	 browserSync({
	 	server:{
	 		baseDir: 'app'},  // папка сервер
	 	notify: false  // отключение уведомлений
	 });
});

// автоматическое обновление css и запуск browser-sync, less
gulp.task('watch',['browser-sync', 'sass' ], function() {
	    gulp.watch(['app/sass/*.sass','app/sass/*.scss' ], ['sass']);
	    gulp.watch('app/*.html', browserSync.reload);
	    gulp.watch('app/js/**/*.js', browserSync.reload);
}); // указывается файл, в котором отслеживают изминения и таски которые выполнятся после этого

                           // СБОРКА ПРОЭКТА 

// удаляем build

gulp.task('clean', function(cb) {
    rimraf('build', cb);
});


gulp.task('build', ['clean'] ,function(){
    gulp.src('app/**/*')
        .pipe(useref())
        .pipe(gulpIf('*.css', gcmq()))
        .pipe(gulpIf('*.css', csso()))
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('build'))
})


gulp.task('minhtml', function() {
  return gulp.src('build/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
});