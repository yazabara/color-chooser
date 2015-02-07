var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(['app', 'http', 'routes/index', 'routes/errors'], function (app, http, colorRoutes) {

    var server = http.createServer(app);

    server.listen(app.get('port'), function (err) {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
