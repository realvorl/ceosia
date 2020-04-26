#!/usr/bin/env node
const ceosia = require('../lib/ceosia');
const methods = ['ascii', 'emoji', 'terminal'];

var argv = require('minimist')(process.argv.slice(2));
if (argv) {
    if (argv['color'] || argv['bgColor']) {
        let style = {};
        let colors = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan',
            'white', 'gray', 'redBright', 'greenBright', 'yellowBright', 'blueBright',
            'magentaBright', 'cyanBright', 'whiteBright'];

        if (colors.includes(argv['color'])) {
            style.color = argv['color'];
        };
        if (colors.includes(argv['bgColor'])) {
            style.bgColor = argv['bgColor'];
        };
        ceosia.chalkStyle(style);
    }
    if (argv['live']) {
        liveFlag = (argv['live'] === true);
        ceosia.live(liveFlag)
    }
    if (argv['method']) {
        let withMethod = argv['method'].trim();
        if (methods.includes(withMethod)) {
            ceosia.decideAndDraw(withMethod);
        }
    } else {
        ceosia.decideAndDraw("terminal");
    }
} else {
    ceosia.decideAndDraw("terminal");
}
