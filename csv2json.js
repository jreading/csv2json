/*
* @author: Johnny Reading
*/
var version = 'v0.0.1';

// Dependencies
var app = require('commander'),
    fs = require('fs'),
    exec = require('child_process').exec,
    app = require('commander'),
    chalk = require('chalk'),
    _ = require('lodash');

var input, output;

var init = function() {
    try {
        //config = JSON.parse(fs.readFileSync('config.json', 'ascii'));
        /* Commander Config */
        app
        .version(version + ' - Convert CSV to JSON')
        .option('-i, --input <file>', 'input csv dir; default: "input"', String, 'input')
        .option('-o, --output  <file>', 'output json dir; default: "output"', String, 'output')
        .on('--help', function(){
        //nothing
            console.log('ain\'t nobody got time for that');
        })
        .parse(process.argv);
        /*
        Pass in arguments with defaults
        */
        input = app.input;
        output = app.output;
        /* Start processing chain */
        
        convertCSV();

    } catch (e) {
        console.error(chalk.red("fail", e));
    }
};

var convertCSV = function () {
    console.log(chalk.blue("Running convertCSV"));
    mainInput = fs.readdirSync(input);

    _.each(mainInput, function(file) {
        stat = fs.statSync(input + "/" + file);
        if (stat.isFile() && file.indexOf('.csv') > 0) {
            var cvsContents = fs.readFileSync(input + "/" + file);
            console.log(cvsContents.toString());
        }
    });
    
};

init();