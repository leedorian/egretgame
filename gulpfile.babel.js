import gulp from 'gulp';
import sftp from 'gulp-sftp';
import {
    exec
} from 'child_process';
import runSequence from 'run-sequence';
import 'babel-polyfill';
import del from 'del';

const distDir = './cordova/www';
const egretDebug = './egret';
const egretRelease = './egret/bin-release/web/v1';

function execCallback(err, stdout, stderr) {
    console.log(stdout);
}

gulp.task('clean', () => del([
    // here we use a globbing pattern to match everything inside the `mobile` folder
    `${distDir}/**/*`,
]));
gulp.task('copy-debug', () => gulp.src(
    [`${egretDebug}/bin-debug/**/*`, `${egretDebug}/libs/**/*`, `${egretDebug}/src/**/*`,  `${egretDebug}/resource/**/*`, `${egretDebug}/index.html`, `${egretDebug}/manifest.json`], {
        base: egretDebug
    },
).pipe(gulp.dest(distDir)));

gulp.task('copy-release', () => gulp.src(
    [`${egretRelease}/**/*`], {
        base: egretRelease
    },
).pipe(gulp.dest(distDir)));

gulp.task('sftp-resources', () => gulp.src(
    ['./cordova/www/**/*'],
    // ['./cordova/www/**/*'],
    {
        base: './cordova/www'
    },
).pipe(sftp({
    host: '47.98.97.163',
    user: 'root',
    pass: 'Dop+yyfwq456',
    remotePath: '/home/wxg/apache-tomcat-6.0.29/webapps/ROOT/game',
})));
gulp.task('sftp-app', () => gulp.src(
    ['./cordova/platforms/android/app/build/outputs/apk/release/app-release.apk'],
    // ['./cordova/www/**/*'],
    {
        base: './cordova/platforms/android/app/build/outputs/apk/release'
    },
).pipe(sftp({
    host: '47.98.97.163',
    user: 'root',
    pass: 'Dop+yyfwq456',
    remotePath: '/home/wxg/apache-tomcat-6.0.29/webapps/ROOT/game',
})));

gulp.task('egret-build', () => new Promise((resolve, reject) => {
    exec('egret build', {
        cwd: egretDebug,
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));

gulp.task('egret-run', () => new Promise((resolve, reject) => {
    exec('egret run', {
        cwd: egretDebug,
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));

gulp.task('egret-release', () => new Promise((resolve, reject) => {
    exec('egret publish --version v1', {
        cwd: egretDebug,
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));

gulp.task('cordova-hcp', () => new Promise((resolve, reject) => {
    exec('cordova-hcp build', {
        cwd: './cordova',
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));
gulp.task('cordova-prepare', () => new Promise((resolve, reject) => {
    exec('cordova prepare', {
        cwd: './cordova',
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));
gulp.task('cordova-build', () => new Promise((resolve, reject) => {
    exec('cordova build android --release', {
        cwd: './cordova',
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));
gulp.task('cordova-run', () => new Promise((resolve, reject) => {
    exec('cordova run android', {
        cwd: './cordova',
    }, (err, stdout, stderr) => {
        execCallback(err, stdout, stderr);
        resolve.call();
    });
}));
gulp.task('build', () => runSequence('egret-build', 'clean', 'copy-debug'));
gulp.task('mobile-run', () => runSequence('egret-build', 'clean', 'copy-debug', 'cordova-run'));
gulp.task('release', () => runSequence('egret-release', 'clean', 'copy-release', 'cordova-hcp', 'cordova-prepare'));
// gulp.task('deploy', ['build', 'cordova-build', 'sftp-resources', 'sftp-app'], () => {});

gulp.task('deploy', () => runSequence('build', 'cordova-build', 'sftp-resources', 'sftp-app'));

// gulp.task('watch', () => {
//   gulp.watch('./src/game/**/*', ['build']);
// });

gulp.task('default', ['build'], () => {});
