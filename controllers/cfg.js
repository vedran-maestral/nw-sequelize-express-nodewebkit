/**
 * This configuration is called from js/cfg.js
 * js/cfg.js is loaded from layout.handlebars
 */
exports.getConfig = function (req, res) {
    //Determine what is sent to client from the configuration file, or make a whole new file.
    secrets.api.port = ":" + secrets.PORT;
    secrets.api.runtime = secrets.runtime; //Used to get handle on execution context on the "client"
    secrets.api.onlineLocation = secrets.onlineLocation
    res.send(secrets.api);
};