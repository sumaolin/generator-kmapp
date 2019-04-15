'use strict';
var generators = require('yeoman-generator');
// var yosay = require('yosay');
var chalk = require('chalk');
var wiredep = require('wiredep');
var mkdirp = require('mkdirp');
var _s = require('underscore.string');

module.exports = generators.Base.extend({
	constructor: function() {
		generators.Base.apply(this, arguments);
	},

	initializing: function() {
		this.pkg = require('../../package.json');
	},

	writing: {
		gulpfile: function() {
			this.fs.copyTpl(
				this.templatePath('gulpfile.babel.js'),
				this.destinationPath('gulpfile.babel.js'),
				{
					date: new Date().toISOString().split('T')[0],
					name: this.pkg.name,
					version: this.pkg.version
				}
			);
		},

		packageJSON: function() {
			this.fs.copyTpl(
				this.templatePath('_package.json'),
				this.destinationPath('package.json'),
				{
					includeSass: this.includeSass,
					appname: this.appname
				}
			);
		},

		bower: function() {
			var bowerJson = {
				name: _s.slugify(this.appname),
				private: true,
				dependencies: {}
			};

			bowerJson.dependencies['jquery'] = '~2.1.1';
			this.fs.writeJSON('bower.json', bowerJson);
			this.fs.copy(
				this.templatePath('bowerrc'),
				this.destinationPath('.bowerrc')
			);
		},

		styles: function() {
			var main = 'main.less';
			var reset = 'reset.less';

			this.fs.copyTpl(
				this.templatePath(reset),
				this.destinationPath('app/assets/styles/' + reset)
			);

			this.fs.copyTpl(
				this.templatePath(main),
				this.destinationPath('app/assets/styles/' + main)
			);
		},

		scripts: function() {
			this.fs.copy(
				this.templatePath('main.js'),
				this.destinationPath('app/assets/scripts/main.js')
			);
			this.fs.copy(
				this.templatePath('setFont.js'),
				this.destinationPath('app/assets/scripts/setFont.js')
			);
		},

		gitignore: function() {
			this.fs.copy(
				this.templatePath('gitignore'),
				this.destinationPath('.gitignore')
			);
		},

		babelSet: function() {
			this.fs.copy(
				this.templatePath('.babelrc'),
				this.destinationPath('.babelrc')
			);
		},

		editorConfig: function() {
			this.fs.copy(
				this.templatePath('.editorconfig'),
				this.destinationPath('.editorconfig')
			);
		},
		readMe: function() {
			this.fs.copy(
				this.templatePath('README.md'),
				this.destinationPath('README.md'),
				{
					appname: this.appname
				}
			);
		},

		html: function() {
			// var bsPath;
			// // path prefix for Bootstrap JS files
			// if (this.includeBootstrap) {
			// 	bsPath = '/app/bower_components/';
			// 	if (this.includeSass) {
			// 		bsPath += 'bootstrap-sass/assets/javascripts/bootstrap/';
			// 	} else {
			// 		bsPath += 'bootstrap/js/';
			// 	}
			// }

			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('app/index.html'),
				{
					appname: this.appname
				}
			);
		},

		misc: function() {
			mkdirp('app/assets/images');
			mkdirp('app/assets/fonts');
		}
	},

	install: function() {
		this.installDependencies({
			skipMessage: this.options['skip-install-message'],
			skipInstall: this.options['skip-install']
		});
	},

	end: function() {
		var bowerJson = this.fs.readJSON(this.destinationPath('bower.json'));
		var howToInstall =
      '\nAfter running ' +
      chalk.yellow.bold('npm install & bower install') +
      ', inject your' +
      '\nfront end dependencies by running ' +
      chalk.yellow.bold('gulp wiredep') +
      '.';

		if (this.options['skip-install']) {
			this.log(howToInstall);
			return;
		}

		// wire Bower packages to .html
		wiredep({
			bowerJson: bowerJson,
			directory: 'app/bower_components',
			ignorePath: /^(\.\.\/)*\.\./,
			src: 'app/index.html'
		});
	}
});
