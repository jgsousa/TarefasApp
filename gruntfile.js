module.exports = function(grunt) {
    grunt.initConfig({
        uglify: {
            my_target: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: '**/*.js',
                    dest: 'dest/js'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('uglify', [
        'uglify'
    ]);
}