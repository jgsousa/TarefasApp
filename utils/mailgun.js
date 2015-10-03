var fs = require('fs');

var config = {};
if ( process.env.LOCAL ) {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
}
else {
    config.emailaccount = process.env.MAILACCOUNT;
    config.emailpass = process.env.MAILPASS;
}

var domain = config.emailaccount.split("@")[1];
var mailgun = require('mailgun-js')({apiKey: config.emailpass, domain: domain});


exports.sendMail = function(user,payload, callback) {

    var attch = new mailgun.Attachment({data: payload, filename: "listaRecursos.xlsx"});


    var text = 'Relatorio em anexo';
    var data = {
        from: config.emailaccount,
        to: user.email,
        subject: 'Gestao de RC - Envio de relatorio',
        text: text,
        attachment: attch
    };

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.log(error);
            error.user = config.emailaccount;
            error.code = "500";
            error.pass = config.emailpass;
            error.raios = "Que treta de erro";
            callback(error)
        } else {
            console.log("Message sent to user " + user.name);
            body.code = "200";
            callback(body);
        }
    });
}