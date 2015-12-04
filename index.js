var slackbot = require('node-slackbot');

var token = process.env.SLACK_API_TOKEN;

var request = require('request');

var bot = new slackbot(token);

var pounditthom = function(message, cb) {

    var pounditthom_mention = "<@U0FSRAHH8>";

    if ('message' == message.type) {
        console.log("=========================MESSAGE============================");
        console.log(message);
        console.log("============================================================");
    }

    // pound Thom's every message
    if ( 'message' == message.type && message.text !== undefined && message.user ==  "U04UPF4Q7") {

        request("https://slack.com/api/reactions.add?token=" + token + "&name=punch&channel=" + message.channel + "&timestamp=" + message.ts, function(err, response, body) {
            console.log("----------------response----------------")
            console.log(response);
            console.log("----------------------------------------")

        });

    }

    if ( 'message' == message.type && message.text !== undefined && message.text.indexOf(pounditthom_mention) > -1) {

        if ( message.text.indexOf("bye") > -1 || message.text.indexOf("good bye") > -1 || message.text.indexOf("byeeeee") > -1 ) {

            bot.sendMessage(message.channel, "Bye guys, don't forget to pound");

        } else if ( message.text.indexOf("hello") > -1 || message.text.indexOf("hi") > -1 ) {

            bot.sendMessage(message.channel, "Hello <@" + message.user + ">, I'm pounditthom. I pound to every comment Thom makes.");

        }

    }

    cb();

};

bot.use(pounditthom);

bot.connect();