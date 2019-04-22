//const filename = document.getElementById("filename").value;
const fs = require('fs')
console.log("inside js")
//function readFile(filename)
document.getElementById('file').onchange = function() {

    var heading = "Transaction Reference ID" + "," + "Date" + "," + "Payer Name" + "," + "Payer Account Number" + "," + "Payee Name" + "," + "Payee Account Number" + "," + "Amount" + "," + "Validity";

    fs.writeFile("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\Valid.txt", heading, (err) => {
        // In case of a error throw err. 
        if (err) throw err;
    })
    fs.writeFile("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\AllRecords.txt", heading, (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })

    var filename = this.files[0];
    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        var lines = this.result.split('\n');
        for (var line = 0; line < lines.length; line++) {
            if (line.length() < 127)
                check(line, line.length());
            else
                process(lines[line]);
        }
    };
    reader.readAsText(file);
}

function check(str, length) {
    var temp = null;
    if (length < 12)
        temp = str.substring(0, length) + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + "invalid";

    else if (length < 20)
        temp = str.substring(0, 12) + "," + str.substring(12, length) + "," + " " + "," + " " + "," + " " + "," + " " + "," + " " + "," + "invalid";

    else if (length < 55)
        temp = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, length) + "," + " " + "," + " " + "," + " " + "," + " " + "," + "invalid";

    else if (length < 67)
        temp = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, 55) + "," + str.substring(55, length) + "," + " " + "," + " " + "," + " " + "," + "invalid";

    else if (length < 102)
        temp = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, 55) + "," + str.substring(55, 67) + "," + str.substring(67, length) + "," + " " + "," + " " + "," + "invalid";

    else if (length < 114)
        temp = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, 55) + "," + str.substring(55, 67) + "," + str.substring(67, 102) + "," + str.substring(102, length) + "," + " " + "," + "invalid";

    else if (length < 127)
        temp = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, 55) + "," + str.substring(55, 67) + "," + str.substring(67, 102) + "," + str.substring(102, 114) + "," + str.substring(114, length) + "," + "invalid";


    fs.writeFile("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\AllRecords.txt", temp, (err) => {

        // In case of a error throw err. 
        if (err) throw err;
    })
    // allRecords.write(System.getProperty( "line.separator" ));
}

function process(str) {
    var flag = 0;
    var substr = str.substring(0, 12);
    //System.out.println(str.substring(20,55)+".................");
    var elementsValid = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, 55) + "," + str.substring(55, 67) + "," + str.substring(67, 102) + "," + str.substring(102, 114) + "," + str.substring(114, 127) + "," + "valid";
    var elementsInvalid = str.substring(0, 12) + "," + str.substring(12, 20) + "," + str.substring(20, 55) + "," + str.substring(55, 67) + "," + str.substring(67, 102) + "," + str.substring(102, 114) + "," + str.substring(114, 127) + "," + "invalid";

    if (!set.contains(substr)) {
        if (!PName(str, 0, 1))
            flag = 1;

        else if (!Date(str, 12))
            flag = 1;

        else if (!PName(str, 20, 0))
            flag = 1;

        else if (!PName(str, 55, 1))
            flag = 1;

        else if (!PName(str, 67, 0))
            flag = 1;

        else if (!PName(str, 102, 1))
            flag = 1;

        else if (!Amount(str, 114))
            flag = 1;

        if (flag == 0) {
            set.add(substr);
            //write into valid csv 

            //allRecords.write(elementsValid);
            fs.writeFile("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\AllRecords.txt", elementsValid, (err) => {

                // In case of a error throw err. 
                if (err) throw err;
            })
            //valid.write(elementsValid);
            fs.writeFile("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\Valid.txt", elementsValid, (err) => {
                // In case of a error throw err. 
                if (err) throw err;
            })
            //valid.write(System.getProperty("line.separator"));
            return;
        }

        //write into invalid file
        allRecords.write(elementsInvalid);
        allRecords.write(System.getProperty("line.separator"));

    }
    else
        //write into invalid file
        //allRecords.write(elementsInvalid);
        fs.writeFile("C:\\Program Files\\Apache Software Foundation\\Tomcat 9.0\\webapps\\CB\\AllRecords.txt", elementsValid, (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })
    //allRecords.write(System.getProperty("line.separator"));
}

function Date(str, q) {
    if (str.substring(q, q + 8).equalsIgnoreCase(new SimpleDateFormat("ddMMyyyy").format(new Date())))
        return true;
    else
        return false;
}

function PName(str, q, isTrID) {
    var substr;
    var i = 0;
    if (isTrID == 1) {
        substr = line.substring(q, q + 12);
        while (i < 12) {
            if (Character.isLetter(substr.charAt(i)) || Character.isDigit(substr.charAt(i)) || substr.charAt(i) == ' ')
                ++i;
            else {
                return false;
            }
        }
    }
    else {
        substr = line.substring(q, q + 35);
        while (i < 35) {
            if (Character.isLetter(substr.charAt(i)) || Character.isDigit(substr.charAt(i)) || substr.charAt(i) == ' ')
                ++i;
            else {
                return false;
            }
        }
    }

    return true;
}


function Amount(line, q) {
    var substr = line.substring(q, q + 13);
    var i = 0;

    while (i < 13) {
        if (!Character.isDigit(substr.charAt(i)) && substr.charAt(i) != '.' && substr.charAt(i) != ' ')
            return false;
        i++;
    }
    return true;


}
