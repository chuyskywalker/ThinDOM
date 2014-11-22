gulp = require 'gulp'
gutil = require 'gulp-util'
rename = require 'gulp-rename'
path = require 'path'
wiredep = require 'wiredep'
wiredepStream = wiredep.stream
inject = require 'gulp-inject'

handleErrors = require '../util/handleErrors'
logger = require '../util/bundleLogger'
notify = require '../util/notify'
content = require '../util/files'

injectTask = (path = '', pageName = '', sourceFiles = [], includeDevDependencies = false) ->
  #1. Add the template to a new stream
  gulp.src path + '/' + pageName + '.tmpl'
    #2: Rename the file from .tmpl to .html
    .pipe rename extname: '.html'
    #3: Inject all OJ resources into the file
    .pipe inject(gulp.src(sourceFiles, read: false), # Not necessary to read the files (will speed up things), we're only after their paths
      addRootSlash: false
      addPrefix: '..')
    #4: Inject all Bower resources into the file
    .pipe wiredepStream
      devDependencies: includeDevDependencies
    #5: write the file to disk
    .pipe gulp.dest path
    #6: Send Growl notification that task has completed
    .pipe notify.message pageName + '.html includes dynamically injected.'
    #7: Write any errors to the console
    .on 'error', handleErrors

# Inject JS & CSS Files
gulp.task 'inject', ->

  src = [
  ]
  #Inject into dev.html
  injectTask './src', 'dev', src

  # Repeat for Unit Tests HTML page
  injectTask './test', 'test', src.concat(['./test/**/*.js*']), true

  # Repeat for Release HTML page
  injectTask './dist', 'release', ['./dist/**/*.min.*']

  return
