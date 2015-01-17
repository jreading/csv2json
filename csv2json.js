/*
* @author: Johnny Reading
*/
var version = 'v0.0.1';

// Dependencies
var app = require('commander'),
    fs = require('fs'),
    exec = require('child_process').exec,
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
        input = app.input;
        output = app.output;
        convertCSV();

    } catch (e) {
        console.error(chalk.red("fail", e));
    }
};

var convertCSV = function () {
    console.log(chalk.blue("Converting CSVs"));
    var mainInput = fs.readdirSync(input),
        inputArr, outputArr, keys, fileName;

    _.each(mainInput, function(file) {
        outputArr = [];
        stat = fs.statSync(input + "/" + file);
        if (stat.isFile() && file.indexOf('.csv') > 0) {
            fileName = file.split('.csv')[0];
            console.log(chalk.green("Reading "+ fileName + ".csv"));
            inputArr = fs.readFileSync(input + "/" + file)
                .toString()
                .replace(/\r/g,'\n')
                .split('\n');
            keys = inputArr
                .shift()
                .split(',');

            _.each(inputArr, function(row) {
                row = row.split(',');
                outputArr.push(JSON.stringify(_.zipObject(keys, row)));
            });

            fs.writeFileSync(output + '/' + fileName + ".json", "[" + outputArr + "]", "utf-8");
            console.log(chalk.yellow("Writing "+ fileName + ".json"));
        }
    });
    
};

init();