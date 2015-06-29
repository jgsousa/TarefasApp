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
                    'public/dist/tarefas.min.js': [
                        'assets/controllers/mainApp.js',
                        'assets/controllers/*.js',
                        'assets/services/*.js',
                        'assets/modals/*.js'
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
            unit: {
                configFile: 'karma.config.js'
            }
        }
    });

    grunt.registerTask('default', ['eslint', 'uglify', 'less', 'karma']);
    grunt.registerTask('deploy', ['eslint', 'uglify', 'less', 'compress']);
};