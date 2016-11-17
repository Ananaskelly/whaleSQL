var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('css', function(){
    gulp.src('style/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('build/styles/'));
});