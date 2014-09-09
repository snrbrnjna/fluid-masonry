/*jshint node: true, strict: false */

// -------------------------- grunt -------------------------- //

module.exports = function( grunt ) {

  // src: content of unpackaged script
  function getBanner(src) {
    var re = new RegExp('^\\s*(?:\\/\\*[\\s\\S]*?\\*\\/)\\s*');
    var matches = src.match( re );
    var banner = matches[0].replace( 'Fluid Masonry', 'Fluid Masonry PACKAGED' );
    return banner;
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: getBanner(grunt.file.read('fluid-masonry.js')),

    jshint: {
      src: [ 'fluid-masonry.js' ],
      options: grunt.file.readJSON('.jshintrc')
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        push: true,
        pushTo: 'origin',
        commit: true,
        commitFiles: ['-a']
      }
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
            start: '<%= banner %>'
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
          banner: '<%= banner %>'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('updateVersion', function() {
    var file = 'fluid-masonry.js';
    var content = grunt.file.read(file);
    var version = grunt.config.get('pkg.version');
    var re = new RegExp(/Fluid Masonry v(\d+\.\d+\.\d+)/);
    var match = content.match(re);
    if (match && match[1] !== version) {
      content = content.replace(re, 'Fluid Masonry v' + version);
      grunt.file.write(file, content);
      // update banner
      grunt.config.set('banner', getBanner(content));
      grunt.log.writeln('version update from ' + match[1] + ' to ' + version);
    } else {
      grunt.log.writeln('version unchanged: ' + version);
    }
  });

  grunt.registerTask( 'pkgd-edit', function() {
    var outFile = grunt.config.get('requirejs.pkgd.options.out');
    var contents = grunt.file.read( outFile );
    contents = contents.replace( "'fluid-masonry/fluid-masonry',", '' );
    grunt.file.write( outFile, contents );
    grunt.log.writeln( 'Edited ' + outFile );
  });

  grunt.registerTask( 'default', [
    'jshint',
    'updateVersion',
    'requirejs',
    'pkgd-edit',
    'uglify'
  ]);

  grunt.registerTask( 'release', function(target) {
    if (target) {
      grunt.task.run([
        'jshint',
        'bump-only:' + target,
        'updateVersion',
        'requirejs',
        'pkgd-edit',
        'uglify'
      ]);
      grunt.log.writeln('check the test cases and commit (-a) and push (--tags) the new version, if everything is fine.');
    } else {
      grunt.warn('no target given for bump task. Has to be one of "patch", "minor", "mayor"');
    }
  });

};
