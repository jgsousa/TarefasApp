var nodemailer = require('nodemailer');
var fs = require('fs');

var config = {};
if ( process.env.LOCAL ) {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
}
else {
    config.emailaccount = process.env.MAILACCOUNT;
    config.emailpass = process.env.MAILPASS;
}

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.emailaccount,
        pass: config.emailpass
    }
});

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

