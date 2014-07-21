gulp = require 'gulp'

gulp.task 'compile', [ 'browserify', 'uglify', 'inject' ]

gulp.task 'build', [
  'compile'
  'test'
  'watch'
]

gulp.task 'default', ['build']
