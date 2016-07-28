module.exports = function (grunt) {

    // Загрузка плагинов, установленных с помощью npm install
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        bgShell: {
            supervisor: {
                cmd: 'supervisor server/server.js',
                stdout: true,
                stderr: true,
                bg: false
            },
            sassWatch: {
                bg: false,
                cmd: "sass --watch scss:server/public/stylesheets"
            },
            sassCompile: {
                cmd: "sass --update scss:server/public/stylesheets"
            }
        },
        concat: {
            main: {
                src: ['javascripts/app.js','javascripts/directives/*.js','javascripts/services/*.js','javascripts/controllers/*.js'],
                dest: 'server/public/javascripts/scripts.js'
            }
        },
        sass: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'scss',
                        src: ['*.scss'],
                        dest: 'server/public/stylesheets',
                        ext: '.css'
                    }
                ]
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: 'sass:dist'
            },
            js: {
                files: ['<%= concat.main.src %>'],
                tasks: 'concat'
            },
            jadeTempalte: {
                files: ['views/angular-templates/*.jade'],
                tasks: 'copy:jadeTemplate'
            }
        },
        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: "server/public/images/",
                    src: ["**"],
                    dest: "server/release/images/"
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: "server/public/stylesheets/",
                    src: ["style.css"],
                    dest: "server/release/stylesheets/"
                }]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: "server/public/javascripts/",
                    src: ["**"],
                    dest: "server/release/javascripts/"
                }]
            },
            jadeTemplate: {
                files: [{
                    expand: true,
                    cwd: 'server/public/templates/',
                    src: ["**"],
                    dest: "server/release/templates/"
                }]
            }
        },
        jade: {
            options: {
                pretty: true,
                amd: false,
                compileDebug: false
            },
            compile: {
                files: [{
                    expand: true,
                    cwd: "./views/",
                    src: ["index.jade"],
                    dest: "server/release/",
                    ext: ".html"
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'server/release/stylesheets/',
                src: ['*.css'],
                dest: 'server/release/stylesheets/',
                ext: '.css'
            }
        },
        //чтобы работало все параллельно
        concurrent: {
            watchServer: ['watch', "bgShell:sassWatch", "bgShell:supervisor"],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    // Загрузка плагинов, установленных с помощью npm install
    require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('server', ['concurrent:watchServer']);
    grunt.registerTask('release', ['jade', 'sass', 'concat', 'copy', 'cssmin']);
};
