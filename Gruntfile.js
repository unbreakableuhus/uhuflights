module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        exec: {
            // Install cordova platforms.
            createJsonData: {
                cwd: "./data",
                cmd: 'python build_json.py'
            }
        },

        "auto_install": {
            options: {
                failOnError: false
            },
            www: {
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        }
    });

    // Load the plugin that provides the "exec" task.
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-auto-install');

    // Default task(s).
    grunt.registerTask('default', ['build']);

    grunt.registerTask('build', [
        'auto_install:www',
        'exec:createJsonData'
    ]);

};