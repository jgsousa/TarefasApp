module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        eslint: {
            options: {
                configFile: './.eslintrc'
            },
            target: [
                'assets/controllers/*.js',
                'assets/modals/*.js',
                'assets/services/*.js',
                'routes/**/*.js',
                'models/**/*.js'
            ]
        },
        uglify: {
            compress: {
                options:{
                    mangle:true,
                    compress:true
                },
                files: [{
                    'assets/bin/tarefas.min.js': [
                        'assets/controllers/mainApp.js',
                        'assets/controllers/*.js',
                        'assets/services/*.js',
                        'assets/libs/*.js',
                        'assets/modals/*.js',
                        'assets/directives/*.js'
                    ],
                    'assets/bin/loginApp.min.js':[
                        'assets/login/*.js'
                    ]
                }]
            }
        },
        less: {
            convert: {
                options: {
                    paths: ["assets/stylesheets"]
                },
                files: {
                    "assets/stylesheets/style.css": "assets/stylesheets/style.less"
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path and its sub-directories
                    {
                        expand: true,
                        cwd: 'assets/pages/',
                        src: ['**'],
                        dest: 'public/pages/'
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'assets/',
                src: ['**/*.js', '**/*.html'],
                dest: 'public/'
            }
        },
        karma: {
            options: {
                configFile: 'karma.config.js'
            },
            unit: {
                // run tests once instead of continuously
                singleRun: true
            }
        }
    });

    grunt.registerTask('default', ['eslint', 'uglify', 'less','karma']);
    grunt.registerTask('build',['eslint','uglify', 'less']);
    grunt.registerTask('deploy', ['eslint', 'uglify', 'less', 'compress']);
};