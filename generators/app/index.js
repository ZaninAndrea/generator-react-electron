var Generator = require("yeoman-generator")

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts)
        this.answers={}
        // Next, add your custom code
    }
    prompting() {
        function createApp(answers) {
            answers.name = answers.name
                .split(" ")
                .join("")
                .toLowerCase() // remove whitespace and lowercase
            if (answers.sass){
              answers.electrondev = /^win/.test(process.platform)
                  ? `concurrently  \\"yarn watch-css\\" \\"SET BROWSER=none&&yarn start\\" \\"wait-on http://localhost:3000 && electron .\\"`
                  : `concurrently \\"yarn watch-css\\" \\"export BROWSER=none && yarn start\\" \\"wait-on http://localhost:3000 && electron .\\"`
            }
            else{
              answers.electrondev = /^win/.test(process.platform)
                  ? `concurrently \\"SET BROWSER=none&&yarn start\\" \\"wait-on http://localhost:3000 && electron .\\"`
                  : `concurrently \\"export BROWSER=none && yarn start\\" \\"wait-on http://localhost:3000 && electron .\\"`
            }

            this.fs.copyTpl(
                this.templatePath("electron-react/README.md"),
                this.destinationPath("README.md"),
                answers
            )
            this.fs.copyTpl(
                this.templatePath("electron-react/package.json"),
                this.destinationPath("package.json"),
                answers
            )
            this.fs.copyTpl(
                this.templatePath("electron-react/gitignore"),
                this.destinationPath(".gitignore"),
                answers
            )
            this.fs.copyTpl(
                this.templatePath("electron-react/src/App.js"),
                this.destinationPath("src/App.js"),
                answers
            )
            this.fs.copy(
                this.templatePath("electron-react/src/App.test.js"),
                this.destinationPath("src/App.test.js")
            )
            this.fs.copy(
                this.templatePath("electron-react/src/index.js"),
                this.destinationPath("src/index.js")
            )
            this.fs.copy(
                this.templatePath(
                    "electron-react/src/utilities/registerServiceWorker.js"
                ),
                this.destinationPath("src/utilities/registerServiceWorker.js")
            )
            this.fs.copyTpl(
                this.templatePath("electron-react/public/electron.js"),
                this.destinationPath("public/electron.js"),
                answers
            )
            this.fs.copy(
                this.templatePath("electron-react/public/favicon.ico"),
                this.destinationPath("public/favicon.ico")
            )
            this.fs.copy(
                this.templatePath("electron-react/public/index.html"),
                this.destinationPath("public/index.html")
            )
            this.fs.copyTpl(
                this.templatePath("electron-react/public/manifest.json"),
                this.destinationPath("public/manifest.json"),
                answers
            )
            if (answers.autoupdate) {
                this.fs.copyTpl(
                    this.templatePath("electron-react/electron-builder.yml"),
                    this.destinationPath("electron-builder.yml"),
                    answers
                )
            }
            this.answers=answers
            this.npmInstall()
        }

        this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname
                    .split(" ")
                    .join("")
                    .toLowerCase(), // Default to current folder name
            },
            {
                type: "input",
                name: "description",
                message: "Your project description",
            },
            {
                type: "input",
                name: "author",
                message: "Who are you?",
                default: this.user.git.name,
                store: true,
            },
            {
                type: "confirm",
                name: "sass",
                message: "Do you want to use sass?"
            },
            {
                type: "confirm",
                name: "prettier",
                message: "Do you want to use Prettier linter?"
            },
            {
                type: "confirm",
                name: "autoupdate",
                message: "Do you want to enable automatic update delivery?",
            },
        ]).then(answers => {
            createApp = createApp.bind(this)
            if (!answers.autoupdate) {
                createApp(answers)
            } else {
                this.prompt([
                    {
                        type: "input",
                        name: "repository",
                        message: "Github repository link",
                        default:
                            "https://github.com/" +
                            this.user.git.name() +
                            "/" +
                            this.appname
                                .split(" ")
                                .join("")
                                .toLowerCase(),
                    },
                    {
                        type: "input",
                        name: "token",
                        message: "Enter your github access token",
                        store: true,
                    },
                ]).then(answers2 => {
                    createApp({...answers, ...answers2})
                })
            }
        })
    }
}
