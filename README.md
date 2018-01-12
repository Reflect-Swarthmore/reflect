reflect 

A Chrome Extension journal 

Mission
	
The mission of reflect is to provide users with an immersive and enriching journaling experience on their browser. The advantage of building this app around a chrome extension is being able to use it on Google Chrome. The extension opens every time a user opens a new tab, making journaling throughout the day easier. 

Web Development Tools Overview

Package Manager
node package manager (npm)
npm allows projects to use and manage packages (sometimes called modules)
https://docs.npmjs.com/getting-started/what-is-npm

Packaging Modules  
  Babel
    A javascript compiler. This module allows us to use new JavaScript (ES6) in browsers that don’t support all the new 
    functionality by transcribing it to ES5. 
    http://babeljs.io/  
  Webpack
    A module bundler. Webpack allows us to use ‘require’ in our JavaScript files in order to import other modules. This is a     functionality that node.js provides on the server side, but since we are not using node.js on to run our app, then 
    webpack provides the development tools. 
    https://webpack.js.org/guides/ 
	create-react-app
    A github repository that serves as a starting point for a react application. Includes commands such as ‘npm run start’ 
    and ‘npm run build’ to build packages and have live updates for easier development. 
    https://github.com/facebookincubator/create-react-app 

UI Modules  
  React
    A front-end tool to build UI. Uses component based classes that allows us to render changes to our DOM. With react.js, we 
    don’t need to manipulate the DOM (html page) with jQuery or JavaScript
    https://facebook.github.io/react/ 
  Draft-js 
    A rich text editor made by facebook for react 
    https://draftjs.org/docs/overview.html#content 
  Semantic-UI React
    A framework UI similar to Bootstrap, but it is wrapped in React. This gives us great UI tools out of the box. 
    https://react.semantic-ui.com/usage 

User State Management
  Redux
    It helps you write applications that behave consistently, run in different environments (client, server, and native), and 
    are easy to test. 
    http://redux.js.org/ 
Database
  Firebase 
    A database that stores the user’s data, provides authentication tokens, hosts web content, and provides cloud functions 
    for computational intensive functions
      Firebase API references: 
      Documentation: https://firebase.google.com/docs/reference/js/ 
      Getting started: https://firebase.google.com/docs/web/setup 
      Authentication: https://firebase.google.com/docs/auth/web/start
      Database: https://firebase.google.com/docs/database/web/start
      Hosting: https://firebase.google.com/docs/hosting/ 
      Cloud functions: https://firebase.google.com/docs/functions/
      Storage: https://firebase.google.com/docs/storage/web/start 
