AngularJS Starter Application
=========

Prerequisites
---------

- [Node.js](https://nodejs.org/en/) ```>= 0.8.0```
- [Grunt CLI](http://gruntjs.com/getting-started) running ```sudo npm install -g grunt-cli```

Setup
---------

- copy all sources except the **.git/** directory in your project
- **package.json** - set your project name, version, description, license, author and repository
- **index.html** - set your application title and description
- **favicon.ico** - replace it with your application icon
- **README.md** - set your project name, remove this section and add your additional instructions

> **Tip** : to change the [AngularJS](https://angularjs.org/) application module name, edit the **"app_name"** property in **Gruntfile.js** and replace all occurrences of the old value in application scripts.

Development Build
---------

- run ```npm install``` to download NPM dependencies (once)
- run ```grunt dev``` to generate the **.dist/** directory, serve it on port **9000** and regenerate it when changes are detected in the **.src/** directory

Production Build
---------

- run ```npm install``` to download NPM dependencies (once)
- run ```grunt build```  to generates the **.dist/** directory (you can copy it in your [Apache Server](https://httpd.apache.org/))
- (run ```grunt serve``` to serve the **.dist/** directory on port **9000**)