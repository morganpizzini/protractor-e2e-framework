var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    typescript = require('gulp-tsc'),
    gulpSequence = require('gulp-sequence'),
    bump = require('gulp-bump'),
    git = require('gulp-git'),
    del = require('del');

require('git-guppy')(gulp);
var PATHS = {
    src: 'lib',
    dist: 'dist',
    test: 'test',
    
};
function resolveArgs(searchArg){
    var option, 
        i = process.argv.indexOf(searchArg);
    if (i > -1) {
        return process.argv[i + 1];
    }
    return null;
}

gulp.task('test', () => {
        //run test
        return gulp.src(PATHS.test + '/**/*.js', { read: false })
        // `gulp-mocha` needs filepaths so you can't have any plugins before it
        .pipe(mocha())
});
gulp.task('clean:build', function () {
    return del([
        PATHS.dist
    ]);
});

gulp.task('build', () => {
    return gulp.src(['index.ts', PATHS.src + '/**/*.ts'])
        .pipe(typescript({
            target: 'es5',
            module: 'commonjs',
            outDir: "./dist",
            declaration: true,
            tmpDir: ".tmp",
            keepTree: false
        }))
        .pipe(gulp.dest(PATHS.dist + '/'))
});

gulp.task('b:watch', ['build'], function () {
    gulp.watch([
        PATHS.src + '/**/*.ts',
    ], ['build']);
});

gulp.task('t:watch', ['test'], function () {
    gulp.watch([
        PATHS.src + '/**/*.ts',
        PATHS.test + '/**/*.ts'
    ], ['test']);
});

gulp.task('bt:watch', ['build:test'], function () {
    gulp.watch([
        PATHS.src + '/**/*.ts',
        PATHS.test + '/**/*.ts',
        PATHS.test + '/**/*.js'
    ], ['build:test']);
});

gulp.task('clean', ['clean:build']);
gulp.task('build:test', gulpSequence('build', 'test'));
gulp.task('dist', gulpSequence('clean', 'build'));
gulp.task('production', gulpSequence('clean','build:test'));
gulp.task('default', ['build']);

/**
  * Git Hooks
  */
gulp.task('pre-commit', ['add']);

gulp.task('add', ['default'], function () {
    return gulp.src('.')
        .pipe(git.add({ options: '-A' }));
});

gulp.task('commit', ['pre-commit'], function () {
    console.log(resolveArgs("-m"));
    return gulp.src('.')
        .pipe(git.commit(resolveArgs("-m")))
        // , { emitData: true })
        //     .on('data', function (data) {
        //         git.push('origin', function (err) {
        //             if (err) throw err;
        //         });
        //     });
});

gulp.task('push',['commit'], function () {
    git.push('origin', 'master', function (err) {
        if (err) throw err;
    });
});

gulp.task('push:tags', function () {
    git.push('origin', 'master', { args: " -tags" }, function (err) {
        if (err) throw err;
    });
});

/**
 * Bumping version
 */
function inc(importance) {
    return gulp.src(['./package.json'])
        .pipe(bump({ type: importance }))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('Bumps for new ' + importance + ' release.'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
}

gulp.task('patch', function () { return inc('patch'); });
gulp.task('feature', function () { return inc('minor'); });
gulp.task('release', function () { return inc('major'); });