> lightweight yeoman generator to get you started with the beautiful react-electron combo.    

## Getting started
The usage is very simple:  
- installign yeoman, if you haven't done that yet  
```bash  
npm install -g yo  
```  
- installing the generator  
```bash  
npm install generator-react-electron -g  
```  
- call this from inside the folder you want to bootstrap your application  
```bash  
yo react-electron  
```

And you are now good to go!

### Development and deployment
- to start the development environment with hot reloading
```bash
npm run electron-dev
```
- to create an optimized version of you app (output in the dist folder)
```bash
npm run electron-pack
```
### Autoupdates
If you chose to have autoupdates, change the package version, run the following line, then go to the repository's releases and publish the new release.
```bash
npm run ship
```

### Linting
If you opted-in prettier, your files will automatically be linted on commit, or when you run
```bash
npm run pretty
```

### Sass
If you chose to use sass, it will be converted into css automatically when building and is also hot-reloaded during development
