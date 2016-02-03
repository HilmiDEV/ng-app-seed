AngularJS Application Seed
=========

Prerequisites
---------

- [Node.js](https://nodejs.org/en/) ```>= 0.8.0```
- [Grunt CLI](http://gruntjs.com/getting-started) running ```sudo npm install -g grunt-cli```

Development Build
---------

- run ```npm install``` to download NPM dependencies (once)
- run ```grunt dev``` to generate the **.dist/** directory, serve it on port **9000** and regenerate it when changes are detected in the **.src/** directory

Production Build
---------

- run ```npm install``` to download NPM dependencies (once)
- run ```grunt build```  to generates the **.dist/** directory (you can copy it in your [Apache Server](https://httpd.apache.org/))
- (run ```grunt serve``` to serve the **.dist/** directory on port **9000**)