/*jshint node: true, strict: false */

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  var banner = ( function() {
    var src = grunt.file.read('fluid-masonry.js');
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    var banner = matches[0].replace( 'Fluid Masonry', 'Fluid Masonry PACKAGED' );
    return banner;
  })();

  grunt.initConfig({

    jshint: {
      src: [ 'fluid-masonry.js' ],
      options: grunt.file.readJSON('.jshintrc')
    },

    requirejs: {
      pkgd: {
        options: {
          baseUrl: 'bower_components',
          include: [
            'jquery-bridget/jquery.bridget',
            'fluid-masonry/fluid-masonry'
          ],
          out: 'dist/fluid-masonry.pkgd.js',
          optimize: 'none',
          paths: {
            'fluid-masonry': '../',
            jquery: 'empty:'
          },
          wrap: {
            start: banner
          }
        }
      }
    },

    uglify: {
      pkgd: {
        files: {
          'dist/fluid-masonry.pkgd.min.js': [ 'dist/fluid-masonry.pkgd.js' ]
        },
        options: {
          banner: banner
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-requirejs');

  grunt.registerTask( 'pkgd-edit', function() {
    var outFile = grunt.config.get('requirejs.pkgd.options.out');
    var contents = grunt.file.read( outFile );
    contents = contents.replace( "'fluid-masonry/fluid-masonry',", '' );
    grunt.file.write( outFile, contents );
    grunt.log.writeln( 'Edited ' + outFile );
  });

  grunt.registerTask( 'default', [
    'jshint',
    'requirejs',
    'pkgd-edit',
    'uglify'
  ]);

};
