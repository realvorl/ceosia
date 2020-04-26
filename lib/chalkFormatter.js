
const chalk = require('chalk');

let chalkOpts = {};

function chalkstom() {
    ret = chalk.bold;
    try {
        if (chalkOpts) {
            if (chalkOpts.color) {
                ret = ret[chalkOpts.color];
            }
            if (chalkOpts.bgColor) {
                capitalBgColor = chalkOpts.bgColor.charAt(0).toUpperCase() + chalkOpts.bgColor.slice(1);
                ret = ret['bg' + capitalBgColor];
            }
        }
    } catch (error) {
        console.warn("unable to offer CHALK for: ");
        console.warn("options: " + JSON.stringify(chalkOpts));
    }
    return ret;
}

function chalkStyle(opts) {
    if (opts) {
        if (opts.color) chalkOpts.color = opts.color;
        if (opts.bgColor) chalkOpts.bgColor = opts.bgColor;
    }
}

module.exports = {
    chalktom: chalkstom,
    chalkStyle
}