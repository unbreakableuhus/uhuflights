// The MIT License (MIT)
//
// Copyright (c) 2016 Unbreakable Uhus
// 
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

module.exports = function(grunt) {

    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        deploy: grunt.file.readJSON("deploy.json"),

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
        },

        copy: {
          main: {
            files: [
              {
                expand: true,
                src: "index.*",
                dest: "public/"
              },
              {
                expand: true,
                src: "img/*",
                dest: "public/"
              },
              {
                expand: true,
                src: "css/*",
                dest: "public/"
              }
            ]
          }
        },

        bowercopy: {
          libs: {
            options: {
              destPrefix: "public/js"
            },
            files: {
              "bootstrap.min.js": "bootstrap/dist/js/bootstrap.min.js",
              "jquery.min.js": "jquery/dist/jquery.min.js"
            }
          },
          fonts: {
            files: {
              "public/fonts": "bootstrap/dist/fonts"
            }
          },
          styles: {
            options: {
              destPrefix: "public/css"
            },
            files: {
              "bootstrap.min.css": "bootstrap/dist/css/bootstrap.min.css"
            }
          }
        },

        clean: {
          options: {
            force: true
          },
          "public": [
            "public"
          ]
        },

        "sftp-deploy": {
          build: {
            auth: {
              host: "<%= deploy.host %>",
              authKey: "<%= deploy.authKey %>"
            },
            src: "public",
            dest: "<%= deploy.dest %>",
            serverSep: "/",
            localSep: "/",
            progress: true
          }
        }
    });

    // Load plugin tasks
    grunt.loadNpmTasks("grunt-auto-install");
    grunt.loadNpmTasks("grunt-bowercopy");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-sftp-deploy");

    // Uhu tasks
    grunt.registerTask("default", ["init"]);

    grunt.registerTask("init", [
      "auto_install:www"
    ]);

    grunt.registerTask("publish", [
      "clean",
      "copy",
      "bowercopy"
    ]);

    grunt.registerTask("deploy", [
      "publish",
      "sftp-deploy"
    ]);
};
