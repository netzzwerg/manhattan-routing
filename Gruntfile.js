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

    watch: {
      scripts: {
        files: [ 'main.js' , 'index.html' ],
        tasks: [], // Add more tasks here.
        options: {
          livereload: 35729
        },
      },
    }

  });

  // Load task modules.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['connect', 'watch']);

};