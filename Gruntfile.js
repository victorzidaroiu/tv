module.exports = function(grunt) {
	var es2015 = require('babel-preset-es2015');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'tmp/index.css': 'src/sass/index.sass',
								'tmp/catalogue.css': 'src/sass/catalogue.sass'
            }
        }
    },
		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1
			},
			target: {
				files: {
					'tmp/index.min.css': 'tmp/index.css',
					'tmp/catalogue.min.css': 'tmp/catalogue.css'
				}
			}
		},
		babel: {
			options: {
				sourceMap: true,
				"presets": es2015
			},
			dist: {
				files: {
					"tmp/index_es6.js": "src/client/index.js"
				}
			}
		},
		concat: {
			js: {
				src: [
					'public/vendor/angular.min.js',
					'public/vendor/angular-route.min.js',
					'public/vendor/angular-cookies.min.js',
					'public/vendor/jquery-2.1.4.min.js',
					'public/vendor/semantic.min.js',
					'tmp/index_es6.js'
				],
				dest: 'public/bundle.min.js'
			},
			css: {
				options: {
					separator: ''
				},
				src: [
					'public/vendor/semantic.min.css',
					'tmp/index.min.css',
					'tmp/catalogue.min.css'
				],
				dest: 'public/bundle.min.css'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['sass', 'babel', 'cssmin', 'concat']);
};
