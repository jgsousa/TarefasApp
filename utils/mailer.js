var nodemailer = require('nodemailer');
var fs = require('fs');
var mg = require('nodemailer-mailgun-transport');

var config = {};
if ( process.env.LOCAL ) {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
}
else {
    config.emailaccount = process.env.MAILACCOUNT;
    config.emailpass = process.env.MAILPASS;
}

var domain = config.emailaccount.split("@")[1];
var auth = {
    auth: {
        api_key: config.emailpass,
        domain: domain
    }
};

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(mg(auth));

exports.sendMail = function(user,payload, callback) {
    var text = 'Enviar mail de teste para o user';
    transporter.sendMail({
        from: config.emailaccount,
        to: user.email,
        subject: 'Activacao de aplicacao ' + user.name,
        text: text,
        attachments: [
            {
                filename: 'recursos.xlsx',
                content: payload
            }
        ]
    }, function (error, response) {
        if (error) {
            console.log(error);
            error.user = config.emailaccount;
            error.pass = config.emailpass;
            error.raios = "Que treta de erro";
            callback(error)
        } else {
            console.log("Message sent to user " + user.name);
            callback(response);
        }
    });
};

