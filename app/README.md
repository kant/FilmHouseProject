# Project architechrue and explanation

**Folders logic**

The *public* folder is made to hold all the public ressources accesisble by our client, such as fonrt-end JavaScript, html, css etc...
The *source* folder is made to hold all the back-end logic part, such as main.js the start point and all the module we might create
The *config* folder is made to hold the configuration files

## To Use

In order to launch the app, you need to be inside ./app and do
```
npm start
```
this will make a call to the script inside package.json and actually launch.
```
electron .
```
Then the command prompt will be hosting the server side, and a browser window should appear.

**Disclaimers**
If you just download the project repository, make sure to do a
```
npm install
```
Which going to read all the necessary dependencies register inside package.json and download them in order to launch the app.
