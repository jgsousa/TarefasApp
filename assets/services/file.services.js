mainApp.service('FileServices', [function () {
    this.CSVToArray = function (strData, strDelimiter) {
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ";");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
            (
                // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

                    // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

                    // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"
            ),
            "gi"
        );

        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;

        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while ((arrMatches = objPattern.exec(strData))) {

            // Get the delimiter that was found.
            var strMatchedDelimiter = arrMatches[1];

            // Check to see if the given delimiter has a length
            // (is not the start of string) and if it matches
            // field delimiter. If id does not, then we know
            // that this delimiter is a row delimiter.
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                // Since we have reached a new row of data,
                // add an empty row to our data array.
                arrData.push([]);
            }
            var strMatchedValue;

            // Now that we have our delimiter out of the way,
            // let's check to see which kind of value we
            // captured (quoted or unquoted).
            if (arrMatches[2]) {

                // We found a quoted value. When we capture
                // this value, unescape any double quotes.
                strMatchedValue = arrMatches[2].replace(
                    new RegExp("\"\"", "g"),
                    "\""
                );
            } else {
                // We found a non-quoted value.
                strMatchedValue = arrMatches[3];

            }
            // Now that we have our value string, let's add
            // it to the data array.
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        // Return the parsed data.
        return ( arrData );
    };

    this.XLSXToArray = function(strData){
        //var arr = String.fromCharCode.apply(null, new Uint8Array(strData));
        //var wb = XLSX.read(btoa(arr), {type: 'base64'});

        var wb = XLSX.read(strData, {type: 'binary'});
        var result = [];
        wb.SheetNames.forEach(function(sheetName) {
            var roa = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
            if (roa.length > 0){
                result.push(roa);
            }
        });
        //var output = JSON.stringify(result[0], 2, 2);
        return result[0];
    };

    this.isListaRecursosValid = function(data){
        var object = data[0];
        if (object){
            var keys = Object.keys(object);
            var codigo = keys.indexOf("codigo");
            var rate = keys.indexOf("rateHora");
            var nome = keys.indexOf("nome");
            var nivel = keys.indexOf("nivel");
            return (!(codigo == -1 || rate == -1 || nome == -1 || nivel == -1));
        } else {
            return false;
        }
    };
}]);
