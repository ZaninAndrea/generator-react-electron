var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
    }
    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            }, {
                type: 'input',
                name: 'description',
                message: 'Your project description'
            }, {
                type: 'input',
                name: 'author',
                message: 'Who are you?',
                default: this.user.git.name
            }
        ]).then((answers) => {
	    answers.name = answers.name.split(" ").join("").toLowerCase() // remove whitespace and lowercase
            this.fs.copyTpl(this.templatePath("electron-react/README.md"), this.destinationPath('README.md'), answers)
            this.fs.copyTpl(this.templatePath("electron-react/package.json"), this.destinationPath('package.json'), answers)
            this.fs.copy(this.templatePath("electron-react/gitignore"), this.destinationPath('.gitignore'))
            this.fs.copy(this.templatePath("electron-react/src/App.js"), this.destinationPath('src/App.js'))
            this.fs.copy(this.templatePath("electron-react/src/App.test.js"), this.destinationPath('src/App.test.js'))
            this.fs.copy(this.templatePath("electron-react/src/index.js"), this.destinationPath('src/index.js'))
            this.fs.copy(this.templatePath("electron-react/src/utilities/registerServiceWorker.js"), this.destinationPath('src/utilities/registerServiceWorker.js'))
            this.fs.copy(this.templatePath("electron-react/public/electron.js"), this.destinationPath('public/electron.js'))
            this.fs.copy(this.templatePath("electron-react/public/favicon.ico"), this.destinationPath('public/favicon.ico'))
            this.fs.copy(this.templatePath("electron-react/public/index.html"), this.destinationPath('public/index.html'))
            this.fs.copyTpl(this.templatePath("electron-react/public/manifest.json"), this.destinationPath('public/manifest.json'), answers)
        });
    }
};
