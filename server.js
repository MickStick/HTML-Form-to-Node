/**
 * Declartion of variables
 */
///////////////////////////////////////////////////////////////
const express = require('express');
//const vhost = require('vhost');
const path = require('path');
const fs = require('fs');
const bp = require('body-parser');
const urlcp = bp.urlencoded({ extended: false });
const formidable = require('formidable');
const port = 8080;
//////////////////////////////////////////////////////////////

// const master = express(); 
// const domain = "riurs.dev"

/**
 * Initialization of (Express) Server Class
 */
const app = express();
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(vhost)

///////////////////////////////////////////////////////////////
/**
 * Set Server middleware
 */
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
///////////////////////////////////////////////////////////////

/**
 * Main GET request which manages all GET route request and sends index file
 * @return void
 */
app.get('*', function(req, res, next) {
    res.render('index');
    //res.sendFile(path.join(__dirname, '/index.html', {name: "Solar Flare"}));
});

/**
 * Post handler that receive a post request from the form in index then saves the 
 * file and responds with a message.
 * @param {string} url
 * @param {function} callback
 * @return {Response} Response
 */
app.post('/upload', urlcp, (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        const oldpath = files.file.path;
        const newpath = path.join(__dirname, 'public/Static/') + files.file.name;
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            console.log(files.file.name + " saved..");
            res.json({ message: files.file.name + " saved.." });
        });
        /*console.log(fields);
        console.log(req.header('Content-Type'));
        res.json({ "file": files.file });*/
    });
});



/**
 * Starts the server and attempts to listen to specified port
 */
app.listen(port, function() {
    console.log("Listening to port: " + port);
});