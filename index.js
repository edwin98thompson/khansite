const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/', (req, res) => {  
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
    var email = req.body.email;
    processEmail(email);
    delay(3000);
    res.redirect('/');
});


//function to display label when submit button is pressed

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});



//function to process email and add to textfile if valid

function processEmail(email) {

    if (emailIsEmpty(email)) {
        console.log("Email is empty");
    } else if(checkExists(email)) {
        console.log("Email already exists");
    }else if (emailIsValid(email)) {
        console.log("Email is valid");
        addEmail(email);
    } else {
        console.log("Email is invalid");
    }

};

//function to check if email not empty
function emailIsEmpty(email) {
  if (email == "") {
    return true;
  }
  return false;
}

//function to check if email is valid
function emailIsValid(email) {
    //check if email contains @ symbol
    if (email.indexOf('@') == -1) {
        return false;
    }
    //check if email contains . symbol
    if (email.indexOf('.') == -1) {
        return false;
    }
    return true;
}

//function to add email to textfile
function addEmail(email) {
    //append data to csv file
    email = email + ','
    fs.appendFile('emails.csv', email, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
}

function checkExists(email) {
    //check if email is already in csv file
    var emails = fs.readFileSync('emails.csv', 'utf8');
    if (emails.indexOf(email) == -1) {
        return false;
    }
    return true;
}

//delay function
function delay(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

