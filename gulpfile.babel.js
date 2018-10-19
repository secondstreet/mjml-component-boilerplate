import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import log from 'fancy-log'
import fs from 'fs'
import path from 'path'
import mjml2html from 'mjml'
import { registerComponent } from 'mjml-core'

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      walkSync(path.join(dir, file), filelist);
    } else if (/\.js$/.test(file)) {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
}

const watchedComponents = walkSync('./components')

const compile = () =>
  gulp.src(path.normalize('components/**/*.js'))
    .pipe(babel())
    .on('error', log)
    .pipe(gulp.dest('lib'))
    .on('end', () => {
      watchedComponents.forEach(compPath => {
        const fullPath = path.join(process.cwd(), compPath.replace(/^components/, 'lib'))
        delete require.cache[fullPath]
        registerComponent(require(fullPath).default)
      })

      const data = fs.readFileSync(path.normalize('./index.mjml'), 'utf8');
      const result = mjml2html(data, { beautify: true })
      fs.writeFileSync(path.normalize('./index.html'), result.html)
    })

gulp.task('build', compile)

gulp.task('watch', () => {
  compile()
  return watch([
    path.normalize('components/**/*.js'),
    path.normalize('index.mjml'),
  ], compile)
})
