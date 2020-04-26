const fetch = require('node-fetch');
const { chalkStyle, chalktom: chalkstom } = require('./chalkFormatter');
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

function draw(json, method) {
    switch (method) {
        case "emoji": {
            let { rate, count } = json;
            let formatedRate = ((rate > 1) ? chalkstom().green(rate) : chalkstom().red(rate) + " trees/s");
            console.log(chalkstom()("🌍 " + count + " 🌳 @ " + formatedRate));
        } break;
        case "terminal": {
            let { rate, count } = json;
            console.log(chalkstom()(count + " trees planted @ " + rate + " trees/s."));
        } break;
        case "ascii": {
            let { rate, count } = json;
            mesage = count + " @" + rate + "tree/s"
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
                console.log(chalkstom()(data));
            });
        } break;
    }
}

let tracker = {
    count: 0,
    rate: 1
}

let liveDraw = false;
let drawMethod = "terminal"

function liveUpdate() {
    tracker.count += 1;
    console.clear();
    draw(tracker, drawMethod);
}

function live(method) {
    drawMethod = method;
    ecosiaPromise()
        .then(json => {
            tracker.count = json.count;
            tracker.rate = json.rate;
        }).then(res => {
            setInterval(liveUpdate, tracker.rate * 1000);
        })
};

function decideAndDraw(method) {
    if (liveDraw) {
        live(method);
    } else {
        ecosiaPromise()
            .then(json => draw(json, method));
    }
}

module.exports = {
    chalkStyle,
    live: (set) => liveDraw = set,
    decideAndDraw
}
