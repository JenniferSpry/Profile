'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var projectConfig = {
        app: 'app',
        dist: 'dist'//distribution
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
            livereload: {
                files: [
                    '<%= project.app %>/{,*/}*.html',
                    '{.tmp,<%= project.app %>}/js/{,*/}*.js',
                    '<%= project.app %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']

            },
            sass: { // wenn sich ein sass file ändert, führe sass:dev aus
                files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            },
            bower: {
                files: '<%= project.src %>/bower.json',
                tasks: ['wiredep']
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, projectConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
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
                '<%= project.app %>/js/{,*/}*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
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
              style: 'compressed',
              banner: '<%= tag.banner %>'
            },
            files: {
              '<%= project.dist %>/css/style.css': '<%= project.app %>/css/style.scss'
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
                        'img/{,*/}*.*'
                    ]
                }]
            }
        },
        useminPrepare: {
            html: '<%= project.app %>/index.html',
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
        ngAnnotate: {
            app: {
                files: {
                    '<%= project.dist %>/js/app.js': ['<%= project.dist %>/js/app.js']
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
                length: 20
            },
            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [{
                    src: [
                        '<%= project.dist %>/img/*.{jpg,jpeg,gif,png,svg}',
                        '<%= project.dist %>/js/*.js',
                        '<%= project.dist %>/css/*.css'
                    ]
                }]
            }
        },
        usemin: {
            html: ['<%= project.dist %>/**/*.html'],
            css: ['<%= project.dist %>/**/*.css'],
            options: {
                basedir: '<%= project.dist %>',
                dirs: ['<%= project.dist %>']
            }
        },
        wiredep: {
            app: {
                src: '<%= project.app %>/index.html',
                exclude: ['bower_components/bootstrap-sass-official/assets/javascripts']
            }
        }
    });

    grunt.registerTask('serve', [
        'sass:dev', // css minifizieren und in dist/css speichern
        'clean:server', // .tmp files löschen
        'livereload-start',
        'connect:livereload',
        'open', // browser öffnen
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist', // dist ordner leeren
        'jshint', // js files auf fehler prüfen
        'sass:dist', // css minifizieren und in dist/css speichern
        'copy', // copy alles nicht anderweitig behandelte
        'useminPrepare',
        'concat', // css files concatinieren nach useminPrepare vorgaben; in .tmp/concat/js/app.js speichen
        'ngAnnotate', // angular safe minimier vorbehandlung
        'uglify', // js-dateien in dist optimieren
        'filerev', // name files with hash
        'usemin'
    ]);

    grunt.registerTask('default', ['build']);

};