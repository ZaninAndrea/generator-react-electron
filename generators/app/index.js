var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
    }

    createDirectory() {
        this.fs.copy(this.templatePath("electron-react/README.md"), this.destinationPath('README.md'))
        this.fs.copy(this.templatePath("electron-react/package.json"), this.destinationPath('package.json'))
        this.fs.copy(this.templatePath("electron-react/gitignore"), this.destinationPath('.gitignore'))
        this.fs.copy(this.templatePath("electron-react/src/App.js"), this.destinationPath('src/App.js'))
        this.fs.copy(this.templatePath("electron-react/src/App.test.js"), this.destinationPath('src/App.test.js'))
        this.fs.copy(this.templatePath("electron-react/src/index.js"), this.destinationPath('src/index.js'))
        this.fs.copy(this.templatePath("electron-react/src/utilities/registerServiceWorker.js"), this.destinationPath('src/utilities/registerServiceWorker.js'))
        this.fs.copy(this.templatePath("electron-react/public/electron.js"), this.destinationPath('public/electron.js'))
        this.fs.copy(this.templatePath("electron-react/public/favicon.ico"), this.destinationPath('public/favicon.ico'))
        this.fs.copy(this.templatePath("electron-react/public/index.html"), this.destinationPath('public/index.html'))
        this.fs.copy(this.templatePath("electron-react/public/manifest.json"), this.destinationPath('public/manifest.json'))
    }
};
