module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        // Configuration variables.
        src_dir: './src',
        lib_dir: './lib',
        tmp_dir: './tmp',
        dist_dir: grunt.option('dist_dir') || './dist',

        // Clean output and temporary directories.
        clean: {
            options: {
                force: true
            },
            pre: {
                src: '<%= dist_dir %>'
            },
            post: {
                src: '<%= tmp_dir %>'
            }
        },

        // Analyze JavaScript code.
        jshint: {
            options: {
                jshintrc: true
            },
            src: {
                src: ['<%= src_dir %>/**/*.js']
            }
        },

        // Copy sources, dependencies and libraries.
        copy: {
            src: {
                files: [
                    {
                        src: ['index.html', 'view.jsp', 'config.json'],
                        dest: '<%= dist_dir %>',
                        expand: true,
                        cwd: '<%= src_dir %>'
                    },
                    {
                        src: '**',
                        dest: '<%= dist_dir %>',
                        expand: true,
                        cwd: '<%= src_dir %>/assets'
                    }
                ]
            },
            npm: {
                files: [
                    {
                        src: [
                            './node_modules/angular/angular.min.js',
                            './node_modules/jquery/dist/jquery.min.js',
                            './node_modules/moment/min/moment.min.js',
                            './node_modules/proj4/dist/proj4.js'
                        ],
                        dest: '<%= dist_dir %>/js',
                        expand: true,
                        flatten: true,
                        ext: '.min.js',
                        extDot: 'first'
                    },
                    {
                        src: [
                            './node_modules/font-awesome/css/font-awesome.min.css'
                        ],
                        dest: '<%= dist_dir %>/css',
                        expand: true,
                        flatten: true,
                        ext: '.min.css',
                        extDot: 'first'
                    },
                    {
                        src: [
                            './node_modules/font-awesome/fonts/*'
                        ],
                        dest: '<%= dist_dir %>/fonts',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            lib: {
                files: [
                    {
                        src: '<%= lib_dir %>/*/js/*.js',
                        dest: '<%= dist_dir %>/js',
                        expand: true,
                        flatten: true
                    },
                    {
                        src: '<%= lib_dir %>/*/css/*.css',
                        dest: '<%= dist_dir %>/css',
                        expand: true,
                        flatten: true
                    },
                    {
                        src: '<%= lib_dir %>/*/fonts/*',
                        dest: '<%= dist_dir %>/fonts',
                        expand: true,
                        flatten: true
                    },
                    {
                        src: '<%= lib_dir %>/*/img/*',
                        dest: '<%= dist_dir %>/img',
                        expand: true,
                        flatten: true
                    }
                ]
            }
        },

        // Compile LESS into CSS.
        less: {
            options: {
                compress: true,
                cleancss: true
            },
            src: {
                files: {
                    '<%= dist_dir %>/css/app.css': '<%= src_dir %>/app.less'
                }
            }
        },

        // Transform HTML templates into an Angular module.
        html2js: {
            options: {
                singleModule: true,
                htmlmin: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            },
            src: {
                options: {
                    base: '<%= src_dir %>',
                    module: 'app.templates'
                },
                files: {
                    '<%= tmp_dir %>/app-templates.js': [
                        '<%= src_dir %>/components/**/*.html',
                        '<%= src_dir %>/shared/**/*.html'
                    ]
                }
            }
        },

        // Create a single JavaScript file.
        concat: {
            src: {
                options: {
                    banner: '(function(window, angular){\'use strict\';',
                    footer: '})(window, window.angular);'
                },
                files: {
                    '<%= dist_dir %>/js/app.js': [
                        '<%= src_dir %>/app.js',
                        '<%= src_dir %>/shared/**/*.js',
                        '<%= src_dir %>/components/**/*.js',
                        '<%= tmp_dir %>/app-templates.js'
                    ]
                }
            }
        },

        // Prepare Angular code for obfuscation.
        ngAnnotate: {
            src: {
                files: {
                    '<%= dist_dir %>/js/app.js': '<%= dist_dir %>/js/app.js'
                }
            }
        },

        // Obfuscate JavaScript code.
        uglify: {
            src: {
                files: {
                    '<%= dist_dir %>/js/app.js': '<%= dist_dir %>/js/app.js'
                }
            }
        },

        // Serve the application on "localhost".
        connect: {
            options: {
                port: 9000,
                base: '<%= dist_dir %>'
            },
            default: {
                options: {
                    keepalive: false
                }
            },
            keepalive: {
                options: {
                    keepalive: true
                }
            }
        },

        // Observe source changes to automatically update the output directory.
        watch: {
            options: {
                spawn: false
            },
            src: {
                tasks: ['update'],
                files: '<%= src_dir %>/**'
            }
        }
    });

    // Load plugins that provide tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');

    // Final tasks.
    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean:pre', 'jshint', 'copy', 'less', 'html2js', 'concat', 'ngAnnotate', 'uglify', 'clean:post']);
    grunt.registerTask('serve', ['connect:keepalive']);
    grunt.registerTask('dev', ['clean:pre', 'jshint', 'copy', 'less', 'html2js', 'concat', 'clean:post', 'connect:default', 'watch']);
    grunt.registerTask('update', ['jshint:src', 'copy:src', 'less:src', 'html2js:src', 'concat:src', 'clean:post']);
};