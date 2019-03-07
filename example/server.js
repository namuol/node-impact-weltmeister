var express = require('express'),
    impact = require('impact-weltmeister'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    serveIndex = require('serve-index'),
    port = 8080,
    root = __dirname,
    app = express();

app.use(methodOverride());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

impact.listen(app, {root: root});

app.use('/', express.static(root), serveIndex(root))

app.listen(port);
console.log('app listening on port', port);
