const readlineSync = require('readline-sync');
const axios = require('axios');
const {GOOGLE_API_KEY} = require('./API.config');
const getSenderName = require('./logic/getSenderName');
const getSenderAddress = require('./logic/getSenderAddress');
const getOfficialTitleToContact = require('./logic/getOfficialTitleToContact');
const getMessageToSend = require('./logic/getMessageToSend');
const lobAPIRequest = require('./logic/lobAPIRequest');

let containerForMultipleResults = [];

// senderCity = 'Oakland';
// senderState = 'CA';
// senderStreet = '1600 E 19th St.';
// senderZipCode = '94606';
// senderAddressLine2 = '';

Promise.resolve(getSenderName())
   .then(getSenderAddress())
   .then(getOfficialTitleToContact())

axios.get(`https://www.googleapis.com/civicinfo/v2/representatives?key=${GOOGLE_API_KEY}&address=${senderStreet}%20${senderAddressLine2}%20${senderCity}%20${senderState}`)
  .then((response) => {
    return response;
  })
  .catch((error) => {
    console.log(`Oh no! It looks like your address wasn't quite right. Please start over. Thank you!`);
  })
  .then((response) => {
    apiResponse = response.data;
    apiResponse.offices.forEach((office) => {
      if (office.name.includes(officialTitle)) {
        containerForMultipleResults.push(office.officialIndices[0]);
        electedOfficial = apiResponse.officials[containerForMultipleResults[0]];
      }
    });
    console.log(`You are represented by your ${officialTitleForResponse} ${electedOfficial.name}.`);
  })
  .then(() => {
    getMessageToSend();
  })
  .then(() => {
    lobAPIRequest();
  });
