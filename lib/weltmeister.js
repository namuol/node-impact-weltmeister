var fs = require('fs'),
    path = require('path'),
    glob = require('glob'),
    async = require('async');

exports.listen = function(server, options) {
  var options = options || {},
      root = options.root || __dirname;

  server.get('/lib/weltmeister/api/glob.php', function(req, res) {
    var i,
        results=[],
        globs,
        globParam;

    globs = [];
    globParam = req.query.glob;
    if (typeof globParam === 'string') {
      globs.push(path.join(root, globParam));
    } else {
      // Assume array.
      for (i=0; i < globParam.length; ++i) {
        globs.push(path.join(root, globParam[i]));
      }
    }

    async.each(globs, function(item, cb) {
      glob(item, 0, function(e, matches) {
        if (e) {
          cb(e);
        }

        for (var i in matches) {
          matches[i] = matches[i].substring(root.length);
        }
        results.push.apply(results, matches);
        cb();
      });
    }, function (err) {
      if (err) {
        console.err(err);
        res.send("Unexpected Error: " + err, 500);
      } else {
        res.send(results);
      }
    });
  });

  server.post('/lib/weltmeister/api/save.php', function(req, res){
    var _path = req.param('path'),
        data = req.param('data');

    if (_path && data) {
      if (/\.js$/.test(_path)) {
        fs.writeFile(path.join(root,_path), data, function(err){
          if (err) {
            res.send({ error: 2, msg: 'Couldn\'t write to file: '+ _path });
          } else {
            res.send({ error: 0 });
          }
        });
      } else {
        res.send({ error: 3, msg: 'File must have a .js suffix' });
      }
    } else {
      res.send({ error: 1, msg: 'No Data or Path specified' });
    }
  });

  server.get('/lib/weltmeister/api/browse.php', function(req, res){
    var dir = req.query.dir || '',
        type = req.query.type,
        types = { scripts: ['.js'], images: ['.png', '.gif', '.jpg', '.jpeg'] },
        result = { parent: false, dirs: [], files: [] };

    var filter = (type && types[type]) ? types[type] : false;

    result.parent = req.query.dir ? dir.substring(0, dir.lastIndexOf('/')) : false;

    if (dir[dir.length-1] === '/') dir = dir.substring(0, dir.length-1);
    dir += '/';
    var dirpath = path.normalize(root + dir);

    var stats;
    fs.readdir(dirpath, function(err, files){
      for (var i in files) {
        stats = fs.statSync(dirpath + files[i]);
        if (stats.isDirectory()) {
          result.dirs.push(dir + files[i]);
        } else if (stats.isFile()) {
          if (filter) {
            if (filter.indexOf(path.extname(files[i])) >= 0) {
              result.files.push(dir + files[i]);
            }
          } else {
            result.files.push(dir + files[i]);
          }
        }
      }

      result.files.sort(function(a, b) {
        if (a.toUpperCase() < b.toUpperCase()) {
          return -1;
        } else {
          return 1;
        }
      });

      res.send(result);
    });
  });
  
  return {
    root: root
  };
};
