#!/usr/bin/env node
const readlineSync = require('readline-sync');
const {API_KEY} = require('./googleAPI.config');
const axios = require('axios');

let apiResponse, senderNameConfirm;

// https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS
//
// https://www.googleapis.com/civicinfo/v2/elections?key=${API_KEY}



// let senderName = readlineSync.question("Hello! I'm here to help you write a letter to your legislator about an issue you care about. Let's get started. What is your first and last name? ");
//
// if (readlineSync.question(`It's nice to meet you ${senderName}! Did I get your name right? `).toLowerCase() === 'no') {
//   senderNameConfirm = false;
// } else {
//   senderNameConfirm = true;
// }
//
// while (!senderNameConfirm) {
//   senderName = readlineSync.question("Oh no! I'm sorry. Please re-enter your first and last name. ")
//   let confirmNameFlag = readlineSync.question(`Is ${senderName} correct? `).toLowerCase();
//   if (confirmNameFlag === 'yes') {
//     senderNameConfirm = true;
//   }
// }
//
// console.log("I got it! Great! Let's make some change. First, I'll need to where the letter is coming from.")
//
// let senderZipCode = readlineSync.question("First off, what's your zip code? ");
//
// let senderState = readlineSync.question("What state do you live in? (You can just enter the two letter abbreviation.) ")
//
// let senderCity = readlineSync.question(`${senderState} is awesome. What city do you live in? `);
//
// let senderStreet = readlineSync.question("Almost done! What is your street address? ");
//
// let senderAddressConfirm = readlineSync.question(`Nice work! Just to be sure, I have your address as ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}. Is that correct? `)

let senderStreet = "1600 E 19th St.";
let senderCity = "Oakland";
let senderState = "CA";


axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${senderStreet}%20${senderCity}%20${senderState}`)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log(error, 'Error');
  })
  .then((response) => {
    let specificOffice;
    apiResponse = response.data
    // console.log('RESPONSEEEEEE:', apiResponse.offices);
    apiResponse.offices.forEach((office) => {
      if (office.name === 'Mayor') {
        specificOffice = office.officialIndices[0];
      }
    })
    console.log('officialIndices SHOULD BE 9', specificOffice)
    console.log('MAAYYYYYORRRR?', apiResponse.officials[specificOffice])
  });
