node-impact-weltmeister
-----------------------

Aiming to provide a complete drop-in replacement for the PHP backend used by
ImactJS's Weltmeister editor, for use with express.

This branch fixes a couple of outdated features that the original implemented.  Mainly due to express being a couple of versions higher than it was back then.   

Tutorial
----------
Make sure you have NodeJS installed before continuing.  You can check by entering
the following into your terminal.

    node -v

First, go the root directory above your impact game and setup the npm package.  My folder structure looked something like this:

    .
    ├── ...
    ├──ImpactJS
    │  ├──Impact
    │      ├──index.html
    │      ├──weltmeister.html
    │      ├──lib
    │      ├──media
    │      ├──tools
    │      └── ...
    └── ...
    
So in this case just navigate to the folder just above "Impact" and run the following:

    npm init

Go through the prompts by pressing enter.  Most of the default values are fine but change
"entry point" to server.js.

Then install the necessary depencies with the following command:

    npm install express method-override body-parser serve-index

Then, to install this version of impact-weltmeister, run the following:
    
    npm install git+https://github.com/greeneman42/node-impact-weltmeister.git#master

Copy the example server.js from the example folder into the root directory where you ran
"npm init".

Now you should be able to start the server by running the following:

    node server.js

Now the server is up and running and should be visible if you open your browser and navigate to localhost:8080.

By default, it will load whatever file is at impact/index.html.  To get to Weltmeister,
just navigate to localhost:8080/weltmeister.html

Hope that helps!

---

[![Analytics](https://ga-beacon.appspot.com/UA-33247419-2/node-impact-weltmeister/README.md)](https://github.com/igrigorik/ga-beacon)
