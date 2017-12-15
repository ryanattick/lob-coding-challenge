#!/usr/bin/env node

//THINK ABOUT BREAKING THE DIFFERENT PIECES INTO DIFFERENT FILES!!
const readlineSync = require('readline-sync');
const {API_KEY} = require('./googleAPI.config');
const axios = require('axios');

let apiResponse, senderNameConfirm, addressConfirm, electedOfficial, senderZipCode, senderState, senderCity, senderStreet, officialTitle, validOfficialToContact, officialTitleForResponse;
let containerForMultipleResults = [];

let senderName = readlineSync.question(`Hello! I'm here to help you write a letter to your legislator about an issue you care about. Let's get started. What is your first and last name? `);

while (senderNameConfirm === undefined || senderNameConfirm === false) {
  let nameVerification = readlineSync.question(`It's nice to meet you ${senderName}! Did I get your name right? `);
  if (nameVerification.toLowerCase() === 'no') {
    senderName = readlineSync.question(`I'm sorry! Let's try that again. Please enter your first and last name. `)
    senderNameConfirm = false;
  } else if (nameVerification.toLowerCase() === 'yes') {
    senderNameConfirm = true;
  } else {
    let invalidNameConfirmationResponse = readlineSync.question(`Hmm. I didn't catch that. Try answering with 'yes' or 'no'. Are you ${senderName}? `);
   if (invalidNameConfirmationResponse.toLowerCase() === 'no') {
     senderNameConfirm = false;
   } else if (invalidNameConfirmationResponse.toLowerCase() === 'yes') {
     senderNameConfirm = true;
   }
  }
 }

console.log(`I got it! Great! Let's make some social change. First, I'll need to where the letter is coming from.`)

while (addressConfirm === undefined || addressConfirm === false) {
  senderZipCode = readlineSync.question(`First off, what is your zip code? `);

  senderState = readlineSync.question(`What state do you live in? (You can just enter the two letter abbreviation.) `)

  senderCity = readlineSync.question(`${senderState} is awesome. What city do you live in? `);

  senderStreet = readlineSync.question(`Almost done! What is your street address? `);

  let addressVerification = readlineSync.question(`Nice work! Just to be sure, I have your address as ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}. Is that correct? `);

  if (addressVerification.toLowerCase() === 'no') {
    console.log(`Oh no! Let's try it again.`)
    addressConfirm = false;
  } else if (addressVerification.toLowerCase() === 'yes') {
    addressConfirm = true;
  } else {
   let invalidAddressConfirmationResponse = readlineSync.question(`Hmm. I didn't catch that. Try answering with 'yes' or 'no'. Is your address ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}? `);
   if (invalidAddressConfirmationResponse.toLowerCase() === 'no') {
     addressConfirm = false;
   } else if (invalidAddressConfirmationResponse.toLowerCase() === 'yes') {
     addressConfirm = true;
   }
 }
}

console.log(`Nice! Ok, now let's get to the good part.`);

while (!validOfficialToContact) {
  officialTitle = readlineSync.question(`Who would you like to contact? You can specificy "House", "Senate", "President", or "Governor". `);
  if (officialTitle.toLowerCase() === 'house') {
    officialTitle = 'House of Representatives';
    officialTitleForResponse = 'House member,';
    validOfficialToContact = true;
  } else if (officialTitle.toLowerCase() === 'senate') {
    officialTitle = 'United States Senate';
    officialTitleForResponse = 'Senator,';
    validOfficialToContact = true;
  } else if (officialTitle.toLowerCase() === 'president') {
    officialTitle = 'President of the United States';
    officialTitleForResponse = 'President (or not),'
    validOfficialToContact = true;
  } else if (officialTitle.toLowerCase() === 'governor') {
    officialTitle = 'Governor';
    officialTitleForResponse = 'Governor,'
    validOfficialToContact = true;
  } else {
    console.log(`Hmmm. I didn't get that. Please try again.`);
  }
}

senderCity = 'Oakland';
senderState = 'CA';
senderStreet = '1600 E 19th St.'

axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${API_KEY}&address=${senderStreet}%20${senderCity}%20${senderState}`)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log(error, 'Error');
    //NEED TO HANDLE ADDRESS ERROR BETTER
  })
  .then((response) => {
    apiResponse = response.data;
    apiResponse.offices.forEach((office) => {
      if (office.name.includes(officialTitle)) {
        containerForMultipleResults.push(office.officialIndices[0]);
        electedOfficial = apiResponse.officials[containerForMultipleResults[0]].name;
      }
    });
    console.log(`You are represented by your ${officialTitleForResponse} ${electedOfficial}.`)
  });
