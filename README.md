node-impact-weltmeister
-----------------------

Aiming to provide a complete drop-in replacement for the PHP backend used by
ImactJS's Weltmeister editor, for use with express.

Tutorial
----------
Make sure you have NodeJS installed before continuing.  You can check by entering
the following into your terminal.

    node -v

First, go the root directory above your impact game and initialize it:

    npm init

Go through the prompts.  Most of the default values are fine but change
"entry point" to server.js.

Then install the necessary depencies with the following command:

    npm install express impact-weltmeister method-override body-parser serve-index

Copy the example server.js from the example folder into the root directory where you ran
"npm init".

Now you should be able to start the server by running the following:

    node server.js


Now the server is up on localhost:8080.

By default, it will load whatever file is agt impact/index.html.  To get to Weltmeister,
just navigate to localhost:8080/weltmeister.html

Hope that helps!

---

[![Analytics](https://ga-beacon.appspot.com/UA-33247419-2/node-impact-weltmeister/README.md)](https://github.com/igrigorik/ga-beacon)
