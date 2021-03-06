/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost', // Change to 0.0.0.0 to external connection.
          open: true,
          middleware: function (connect, options) {
            return [
              require('connect-livereload')({ port: 35729 }),
              // Serve static files.
              connect.static(options.base),
            ];
          }
        }
      }
    },

    jsdoc : {
      dist : {
        src: 'src/**/*.js',
        options: {
          config: 'jsdoc.json',
          destination: 'doc',
          template: 'doc/templates/jsdoc3-bootstrap'
        }
      }
    },

    watch: {
      reload: {
        files: [ 'src/Connector.js', 'main.js' , 'index.html' ],
        tasks: [], // Add more tasks here.
        options: {
          livereload: 35729
        }
      },
      unittest: {
        files: 'src/**/*.js',
        tasks: ['jasmine','jsdoc'] // Add more tasks here.
      }
    },

    jasmine: {
      pivotal: {
        src: 'src/**/*.js',
        options: {
          vendor: 'lib/snap.svg.js',
          specs: 'spec/*Spec.js',
          template : require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'reports/coverage.json',
            report: 'reports/coverage'
          }
        }
      }
    }

  });

  // Load task modules.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task.
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['connect', 'watch:reload']);
  grunt.registerTask('test', 'watch:unittest');

};