module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: 'build/css'
        }
      }
    },
    copy: {
      vendor: {
        files: {
          'build/vendor/melonJS-1.0.2.js': 'vendor/melonJS-1.0.2.js',
          'build/vendor/melonJS-1.0.2-min.js': 'vendor/melonJS-1.0.2-min.js',
          'build/vendor/lodash.min.js': 'bower_components/lodash/dist/lodash.min.js'
        }
      },
      html: {
        files: {
          'build/index.html': 'src/html/index.html'
        }
      }
    },
    browserify: {
      dev: {
        files: {
          'build/js/main.js': [ 'src/js/**/*' ]
        }
      }
    },
    watch: {
      options: {
        livereload: 3001
      },
      scss: {
        files: [ 'src/scss/*.scss' ],
        tasks: [ 'compass:dev' ]
      },
      html: {
        files: [ 'src/html/index.html' ],
        tasks: [ 'copy:html' ]
      },
      browserify: {
        files: [ 'src/js/**/*' ],
        tasks: [ 'browserify:dev' ]
      }
    },
    express: {
      server: {
        options: {
          port: 3000,
          bases: 'build'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', [
    'copy',
    'compass',
    'browserify',
    'express',
    'watch'
  ]);
};