var grunt = require('grunt');

grunt.initConfig({
	watch: {
		simplemocha_watch: {
			files: ['!**/node_modules/**', '**/*.js'],
			tasks: ['simplemocha:watch'],
			options: { atBegin: true }
		}
	},
	simplemocha: {
		watch: {
			src: ['test/**/*.js'],
			options: {
				globals: [],
				ignoreLeaks: false,
				bail: true,
				reporter: 'min'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-simple-mocha');
grunt.loadNpmTasks('grunt-contrib-watch');

grunt.registerTask('default', 'watch:simplemocha_watch');