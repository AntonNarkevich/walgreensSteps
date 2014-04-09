module.exports = function (grunt) {

	var path = require('path');
	var fs = require('fs');

	var buildPath = grunt.option('build-path') || 'build';
	var tempPath = grunt.option('temp-path') || 'temp';
	var uploader = grunt.option('uploader') || 'default';
	var filesToUpload = grunt.option('filesToUpload') || '';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		buildPath: buildPath,
		tempPath: tempPath,
		uploader: uploader,
		filesToUpload: filesToUpload.split(','),

		//cleans output folder
		clean: {
			build: {
				src: ['<%= buildPath%>']
			},
			temp: {
				src: ['<%= tempPath%>']
			},
			buildImgsAndCss: {
				src: ['<%= buildPath%>/sources/css/', '<%= buildPath%>/sources/images/'] /* if there are big images you have remove the 2nd element from array */
			}
		},

		// analyzes the js code
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					'jQuery': true,
					'responsify': true,
					'RD': true,
					'jQ': true,
					'Mdr': true,
					'$': true,
					'console': true
				}
			},
			sources: {
				src: ['./sources/js/*.js']
			}
		},

		// concatenates javascript files
		concat: {
			js: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd HH:MM") %> ' +
						'uploaded by: <%= uploader %> */ \n'
				},
				src: ['./sources/js/**/*.js', '<%= tempPath %>/templates.js'],
				dest: '<%= buildPath %>/sources/js/clientMap.js'
			},
			cssIntoJs: {
				options: {
					process: function (src, filepath) {
						return "RD.clientCssManager.set('" + filepath.replace(buildPath + "/sources", "..") + "','" + src + "');"
					}
				},

				src: '<%= buildPath %>/sources/css/**/*.css',
				dest: '<%= tempPath %>/cssSources.js'
			},
			jsAndCss: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd HH:MM") %> ' +
						'uploaded by: <%= uploader %> */ \n'
				},

				src: ['<%= buildPath %>/sources/js/clientMap.js', '<%= tempPath %>/cssSources.js'],
				dest: '<%= buildPath %>/sources/js/clientMap.js'
			},
			clientMapAndTemplates: {
				options: {
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
						'<%= grunt.template.today("yyyy-mm-dd HH:MM") %> ' +
						'uploaded by: <%= uploader %> */ \n'
				},
				src: ['./sources/js/libs/**/*.js', '<%= tempPath %>/templates.js', './sources/js/clientMap.js'],
				dest: '<%= buildPath %>/sources/js/clientMap.js'
			}
		},

		copy: {
			css: {
				files: [
					{ src: ['*'], cwd: './sources/css/', dest: '<%= buildPath %>/sources/css/', expand: true }
				]
			},
			images: {
				files: [
					{ src: ['*'], cwd: './sources/images/', dest: '<%= buildPath %>/sources/images/', expand: true }
				]
			},
			js: {
				files: [
					{ src: ['*'], cwd: './sources/js/', dest: '<%= buildPath %>/sources/js/', expand: true }
				]
			},
			partialCss: {
				files: [
					{ src: '<%= filesToUpload %>', cwd: './sources/css/', dest: '<%= buildPath %>/sources/css/', expand: true }
				]
			},
			partialJs: {
				files: [
					{ src: '<%= filesToUpload %>', cwd: './sources/js/', dest: '<%= buildPath %>/sources/js/', expand: true }
				]
			}
		},

		//minifies javascript files
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:MM") %> */'
			},
			clientmap: {
				files: {
					'<%= buildPath %>/sources/js/clientMap.js': ['<%= buildPath %>/sources/js/clientMap.js']
				}
			}
		},

		// minifies css
		cssmin: {
			css: {
				expand: true,
				cwd: './<%= buildPath %>/sources/css/',
				src: ['**/*.css'],
				dest: '<%= buildPath %>/sources/css/'
			}
		},

		handlebars: {
			compile: {
				options: {
					namespace: "RD.templates",
					processContent: function (content) {
						content = content.replace(/^[\x20\t]+/mg, '').replace(/[\x20\t]+$/mg, '');
						content = content.replace(/^[\r\n]+/, '').replace(/[\r\n]*$/, '\n');
						return content;
					},
					processName: function (filename) {
						return path.basename(filename, '.hbs');
					}
				},
				files: {
					'<%= tempPath %>/templates.js': ['sources/templates/*.hbs']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks("grunt-image-embed");

	var buildTask = ['jshint', 'clean:build', 'clean:temp', 'handlebars', 'concat:js', 'copy:images', 'copy:css', 'img2base64'];

	//tricky way to execute imageEmbed separately for each file
	grunt.registerTask('img2base64', function () {
		var dirPath = buildPath + "/sources/css/",
			files = fs.readdirSync(dirPath),
			imageEmbed = {};

		files.forEach(function (path) {
			var filePath = dirPath + path;
			imageEmbed[path] = {
				src: [filePath],
				dest: filePath,
				options: {
					maxImageSize: 32000,
					deleteAfterEncoding: false
				}
			};
		});

		grunt.config("imageEmbed", imageEmbed);
		grunt.task.run("imageEmbed");
	});

	// build tasks
	grunt.registerTask('build', buildTask);
};