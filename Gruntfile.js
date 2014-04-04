var grunt = require('grunt');

grunt.initConfig({
	watch: {
		simplemocha_watch: {
			files: ['!**/node_modules/**', '**/*.js'],
			tasks: ['simplemocha:watch'],
			options: {
				atBegin: true
			}
		}
	},
	simplemocha: {
		watch: {
			src: ['test/**/*.js'],
			options: {
				globals: [],
				// timeout: 2000,
				ignoreLeaks: false,
				// grep: '*-test',
				// ui: 'bdd',
				reporter: 'min'
			}
		}
	}
});

// For this to work, you need to have run `npm install grunt-simple-mocha`
grunt.loadNpmTasks('grunt-simple-mocha');
grunt.loadNpmTasks('grunt-contrib-watch');

// Add a default task. This is optional, of course :)
grunt.registerTask('default', 'watch:simplemocha_watch');