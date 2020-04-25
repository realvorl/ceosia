#!/usr/bin/env node
const fetch = require('node-fetch');
const chalk = require('chalk');

fetch("https://api.ecosia.org/v1/trees/count")
    .then(res => {
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => {
        let { count, rate } = data;
        let formatedRate = ((rate > 1) ? chalk.green(rate) : chalk.red(rate) + " trees/s");
        console.log(chalk.green.bold("🌍 " + count + " 🌳 @" + formatedRate));
    })
    .catch(error => console.error(error))