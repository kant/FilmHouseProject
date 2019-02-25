# Project architechture and explanation

## Folders logic

- The **app/public** folder is made to hold all the public ressources accesisble by our client, such as fonrt-end JavaScript, html, css etc...
- The **app/source** folder is made to hold all the back-end logic part, such as main.js the start point and all the module we might create  
- The **app/config** folder is made to hold the configuration files

### To Use

In order to launch the app, you need to be inside **./app** and do
```
npm start
```
this will make a call to the script inside package.json and actually launch.
```
electron .
```
Then the command prompt will be hosting the server side, and a browser window should appear.

## Disclaimers
If you just download the project repository, **_make sure to do a_**
```
npm install
```
Which going to read all the necessary dependencies register inside package.json and download them in order to launch the app.
