const fetch = require('node-fetch');
const chalk = require('chalk');
const figlet = require('figlet');

let ecosia = "https://api.ecosia.org/v1/trees/count";

function ecosiaPromise() {
    return fetch(ecosia)
        .then(res => {
            if (res.ok) {
                const json = res.json();
                return json;
            }
        })
        .catch(err => {
            console.error("ceosia: " + chalk.red.bold(err));
        });
}

module.exports = {
    terminal: () => {
        ecosiaPromise()
            .then(json => {
                let { rate, count } = json;
                console.debug(chalk.green(count + " trees planted @" + rate + " trees/s."));
                return json;
            })

    },
    terminalEmoji: () => {
        ecosiaPromise()
            .then(data => {
                let { rate, count } = data;
                let formatedRate = ((rate > 1) ? chalk.green(rate) : chalk.red(rate) + " trees/s");
                console.log(chalk.green.bold("🌍 " + count + " 🌳 @" + formatedRate));
                return data;
            })

    },
    teralminalAscii: () => {
        ecosiaPromise()
            .then(json => {
                let { rate, count } = json;
                mesage = count + " | " + rate + " tree/s"
                figlet(mesage, {
                    horizontalLayout: 'fitted',
                    verticalLayout: "fitted",
                    kerning: "fitted" 
                }, function (err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.log(chalk.green.bold(data));
                });
            })
    }
}
