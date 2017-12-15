#!/usr/bin/env node

//THINK ABOUT BREAKING THE DIFFERENT PIECES INTO DIFFERENT FILES!!
const readlineSync = require('readline-sync');
const {GOOGLE_API_KEY} = require('./API.config');
const {LOB_API_KEY} = require('./API.config');
const axios = require('axios');
const Lob = require('lob')(LOB_API_KEY);


let apiResponse, senderNameConfirm, addressConfirm, electedOfficial, senderZipCode, senderState, senderCity, senderStreet, officialTitle, validOfficialToContact, officialTitleForResponse, messageText, validMessageText, reviewMessageText;
let containerForMultipleResults = [];

let senderName = readlineSync.question(`Hello! I'm here to help you write a letter to your legislator about an issue you care about. Let's get started. What is your first and last name? `);
//
// while (senderNameConfirm === undefined || senderNameConfirm === false) {
//   let nameVerification = readlineSync.question(`It's nice to meet you ${senderName}! Did I get your name right? `);
//   if (nameVerification.toLowerCase() === 'no') {
//     senderName = readlineSync.question(`I'm sorry! Let's try that again. Please enter your first and last name. `)
//     senderNameConfirm = false;
//   } else if (nameVerification.toLowerCase() === 'yes') {
//     senderNameConfirm = true;
//   } else {
//     let invalidNameConfirmationResponse = readlineSync.question(`Hmm. I didn't catch that. Try answering with 'yes' or 'no'. Are you ${senderName}? `);
//    if (invalidNameConfirmationResponse.toLowerCase() === 'no') {
//      senderNameConfirm = false;
//    } else if (invalidNameConfirmationResponse.toLowerCase() === 'yes') {
//      senderNameConfirm = true;
//    }
//   }
//  }
//
// console.log(`I got it! Great! Let's make some social change. First, I'll need to where the letter is coming from.`)
//
// while (addressConfirm === undefined || addressConfirm === false) {
//   senderZipCode = readlineSync.question(`First off, what is your zip code? `);
//
//   senderState = readlineSync.question(`What state do you live in? (You can just enter the two letter abbreviation.) `)
//
//   senderCity = readlineSync.question(`${senderState} is awesome. What city do you live in? `);
//
//   senderStreet = readlineSync.question(`Almost done! What is your street address? `);
//
//   let addressVerification = readlineSync.question(`Nice work! Just to be sure, I have your address as ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}. Is that correct? `);
//
//   if (addressVerification.toLowerCase() === 'no') {
//     console.log(`Oh no! Let's try it again.`)
//     addressConfirm = false;
//   } else if (addressVerification.toLowerCase() === 'yes') {
//     addressConfirm = true;
//   } else {
//    let invalidAddressConfirmationResponse = readlineSync.question(`Hmm. I didn't catch that. Try answering with "yes" or "no". Is your address ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}? `);
//    if (invalidAddressConfirmationResponse.toLowerCase() === 'no') {
//      addressConfirm = false;
//    } else if (invalidAddressConfirmationResponse.toLowerCase() === 'yes') {
//      addressConfirm = true;
//    }
//  }
// }
//
// console.log(`Nice! Ok, now let's get to the good part.`);
//
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
senderStreet = '1600 E 19th St.';
senderZipCode = '94606';

axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${GOOGLE_API_KEY}&address=${senderStreet}%20${senderCity}%20${senderState}`)
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
  })
  .then(() => {
    console.log(`Now that we know who you're writing to, let's get down what you want to say.`)

    messageText = readlineSync.question(`As long as your message is 500 characters or less, you can write about any issue you care about. Let's get to it! Please enter the text you would like to be contained in your letter now. `);

    while(!validMessageText) {
      if(messageText.length <= 500) {
        reviewMessageText = readlineSync.question(`Looking good! Please read over your message one last time to be sure it's exactly how you want it. ${messageText} Is that correct? `);
        if (reviewMessageText.toLowerCase() === 'yes') {
          validMessageText = true;
        } else if (reviewMessageText.toLowerCase() === 'no') {
          messageText = readlineSync.question(`No worries. You can send something else. Please type out your new message here! `);
        } else {
          reviewMessageText = readlineSync.question(`Hmmm. I didn't catch that. Please answer with either "yes" or "no". Here is your message: ${messageText} Is it ready to send? `);
          if (reviewMessageText.toLowerCase === 'yes') {
            validMessageText = true;
          } else if (reviewMessageText === 'no') {
            messageText = readlineSync.question(`No worries. You can send something else. Please type out your new message here! `);
          }
        }
      } else if (reviewMessageText.length > 500) {
        messageText = readlineSync.question(`Oops! It looks like you have ${messageText.length} characters. We need to make sure we keep your message down to 500 characters or less. Please try again! `)
      }
    }
  })
  .then(() => {
    Lob.letters.create({
      description: 'Demo Letter',
      to: {
        name: electedOfficial,
        address_line1: 'CHANGE',
        address_line2: 'CHANGE',
        address_city: 'CHANGE',
        address_state: 'CA',
        address_zip: '94606',
        address_country: 'US',
      },
      from: {
        name: senderName,
        address_line1: senderStreet,
        address_line2: 'CHANGE',
        address_city: senderCity,
        address_state: senderState,
        address_zip: senderZipCode,
        address_country: 'US',
      },
      file: '<html style="padding-top: 3in; margin: .5in;">{{text}}</html>',
      merge_variables: {
        text: messageText
      },
      color: true
    }, function (err, res) {
      console.log(err, res);
    });
  });
