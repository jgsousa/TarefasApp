var XlsxTemplate = require('xlsx-template');
var fs = require('fs');
var Empregado = require('../models/recurso.server.model.js');


exports.createListaRecursos = function(callback) {
    fs.readFile('./templates/listaRecursos.xlsx', function(err, data) {
        var template = new XlsxTemplate(data);

        // Replacements take place on first sheet
        var sheetNumber = 1;

        // Set up some placeholder values matching the placeholders in the template
        Empregado.getAllEmployees(function(err,docs){
            var values = docs;
            // Perform substitution
            template.substitute(sheetNumber, values);

            // Get binary data
            var data = template.generate();
            callback(data);
        });
    });
};