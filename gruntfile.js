'use strict';
var mountFolder = function(connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var projectConfig = {
    app: 'app',
    dist: 'dist',//distribution
    tmp: '.tmp'
  };

  // Project configuration.
  grunt.initConfig({
    project: projectConfig,
    pkg: grunt.file.readJSON('package.json'), //package.json inhalte laden zum so nutzen: <%= pkg.name %>
    tag: {
      banner: '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.title %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @version <%= pkg.version %>\n' +
      ' */\n'
    },
    /** tasks **/
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: [
          'Gruntfile.js', 
          '<%= project.app %>/js/{,*/}*.js', 
          '!<%= project.app %>/js/analytics.js'
        ],
        tasks: ['jshint', 'jscs', 'karma:unit:run']
      },
      sass: { // wenn sich ein sass file ändert, führe sass:dev aus
        files: '<%= project.app %>/css/**/*.scss',
        tasks: ['sass:dev']
      },
      bower: {
        files: '<%= project.app %>/bower.json',
        tasks: ['wiredep']
      },
      html: {
        files: ['<%= project.app %>/**/*.html']
      }
    },
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= project.app %>'
          ]
        }
      }
    },
    clean: { // ordner/ dateien löschen
      dist: {
        files: [{
          dot: true,
          src: [
          '.tmp',
          '<%= project.dist %>/*',
          '!<%= project.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        '<%= project.app %>/js/{,*/}*.js', 
        '!<%= project.app %>/js/analytics.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      src: [
        'Gruntfile.js', 
        '<%= project.app %>/js/{,*/}*.js', 
        '!<%= project.app %>/js/analytics.js'],
      options: {
        config: '.jscsrc'
      }
    },
    karma: {
      options: {
        files: [
          // there must be a better way....
          'app/bower_components/jquery/dist/jquery.js',
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-sanitize/angular-sanitize.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js',
          'app/bower_components/get-style-property/get-style-property.js',
          'app/bower_components/get-size/get-size.js',
          'app/bower_components/eventie/eventie.js',
          'app/bower_components/doc-ready/doc-ready.js',
          'app/bower_components/eventEmitter/EventEmitter.js',
          'app/bower_components/jquery-bridget/jquery.bridget.js',
          'app/bower_components/matches-selector/matches-selector.js',
          'app/bower_components/outlayer/item.js',
          'app/bower_components/outlayer/outlayer.js',
          'app/bower_components/masonry/masonry.js',
          'app/bower_components/imagesloaded/imagesloaded.js',
          'app/bower_components/angular-masonry/angular-masonry.js',
          'app/bower_components/angular-loading-bar/build/loading-bar.js',
          'app/bower_components/angular-animate/angular-animate.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/affix.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/alert.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/button.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/carousel.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/collapse.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/dropdown.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tab.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/transition.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/scrollspy.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/modal.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/tooltip.js',
          'app/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap/popover.js',
          'app/bower_components/headroom.js/dist/headroom.js',
          'app/bower_components/headroom.js/dist/angular.headroom.js',
          'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
          'app/bower_components/angular-touch/angular-touch.js',
          'app/bower_components/bootstrap/dist/js/bootstrap.js',
          'app/bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.js',
          'app/bower_components/bootstrap-ui/src/transition/transition.js',
          'app/bower_components/bootstrap-ui/src/collapse/collapse.js',
          'app/bower_components/bootstrap-ui/src/alert/alert.js',
          'app/js/app.module.js',
          'app/js/app.config.js',

          'app/js/crafts/crafts.module.js',
          'app/js/crafts/crafts-http.service.js',
          'app/js/crafts/all-crafts.controller.js',
          'app/js/crafts/one-craft.controller.js',
          'app/js/crafts/random-crafts.directive.js',
          
          'app/js/projects/projects.module.js',
          'app/js/projects/projects.controller.tests.js',
          'app/js/projects/projects-http.service.js',
          'app/js/projects/projects.controller.js',

          'app/js/illus/illus.module.js',
          'app/js/illus/illus-http.service.js',
          'app/js/illus/illus.controller.js'
        ],
        plugins: [
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-jasmine'
        ],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS']
      },
      unit: {
        background: true
      },
      single: {
        singleRun: true//,
        //browsers: ['Chrome']
      }
    },
    sass: { // einzelne scss files in style includen
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= project.app %>/css/style.css': '<%= project.app %>/css/style.scss'
        }
      },
      dist: {
        options: {
          style: 'expanded'//,
          //banner: '<%= tag.banner %>'
        },
        files: {
          '<%= project.dist %>/css/style.css': '<%= project.app %>/css/style.scss'
        }
      }
    },
    uncss: {
      dist: {
        files: {
          '<%= project.dist %>/css/style.css': [ 
          '<%= project.dist %>{,*/}*.html']
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= project.app %>',
          dest: '<%= project.dist %>',
          src: [
            '*.html',
            'img/{,*/}*.*',
            'js/{,*/}*.html',
            'js/analytics.js'
          ]
        }]
      }
    },
    useminPrepare: {
      html: '<%= project.app %>{,*/}*.html',
      options: {
        dest: '<%= project.dist %>'
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    cssmin: {
      dist: {
        files: {
          '<%= project.dist %>/css/style.css': ['<%= project.dist %>/css/style.css']
        }
      }
    },
    ngAnnotate: {
      app: {
        files: {
          '<%= project.tmp %>/concat/js/app.js': ['<%= project.tmp %>/concat/js/app.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= tag.banner %>'
      },
      // dist configuration is provided by useminPrepare
      dist: {}
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 10
      },
      assets: {
        files: [{
          src: [
            //'<%= project.dist %>/img/*.{jpg,jpeg,gif,png,svg,ico}',
            '<%= project.dist %>/js/*.js',
            '<%= project.dist %>/css/*.css'
            ]
        }]
      }        
    },
    usemin: {
      html: ['<%= project.dist %>/**/*.html'],
      options: {
        basedir: '<%= project.dist %>',
        dirs: ['<%= project.dist %>']
      }
    },
    wiredep: { // import bower sources into index.html
      options: {
        exclude: ['bower_components/headroom.js/dist/jQuery.headroom.js']
      },
      app: {
        src: '<%= project.app %>/index.html',
        exclude: ['bower_components/bootstrap-sass-official/assets/javascripts']
      }
    }
  });

  grunt.registerTask('serve', [
    'karma:unit',
    'sass:dev', // css minifizieren und in dist/css speichern
    'clean:server', // .tmp files löschen
    'connect:livereload',
    'watch'
    ]);

  grunt.registerTask('build', [
    'clean:dist', // dist ordner leeren
    'jshint', // js files auf fehler prüfen
    'copy', // copy alles nicht anderweitig behandelte
    'sass:dist', // css minifizieren und in dist/css speichern
    //'uncss', // remove unused css
    'useminPrepare',
    'concat:generated', // css files concatinieren nach useminPrepare vorgaben; in .tmp/concat/js/app.js speichen
    'cssmin:dist',
    'ngAnnotate', // angular safe minimier vorbehandlung
    'uglify:generated', // js-dateien in dist optimieren
    'filerev', // name files with hash
    'usemin',
    'clean:server'
    ]);

  grunt.registerTask('test', [  
    'jshint',
    'karma:single'
  ]);

  grunt.registerTask('default', ['build']);

};
