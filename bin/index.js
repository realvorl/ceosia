#!/usr/bin/env node
const ceosia = require('../lib/ceosia');
var argv = require('minimist')(process.argv.slice(2));

if (argv) {
    switch (argv['method']) {
        case "ascii": ceosia.teralminalAscii(); break;
        case "emoji": ceosia.terminalEmoji(); break;
        case "undefined": {
            console.warn(argv['method'] + " UNIMPLEMENTED!");
            ceosia.terminal();
        }break;
        default: ceosia.terminal();
    }
} else {
    ceosia.terminal();
}
