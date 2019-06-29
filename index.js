'use strict';

var express = require('express');
var kraken = require('kraken-js');
var logger = require('winston');
var database = require('./lib/database');


var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        database.config(logger)
            .then(() => {
                logger.debug('Database setup is complete');
            });
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

app.get('/', function (req, res) {
    res.send("Express Server is Running");
    res.end();
})
