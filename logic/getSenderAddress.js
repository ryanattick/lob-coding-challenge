const readlineSync = require('readline-sync');

let addressConfirm;

module.exports = function() {
  while (!addressConfirm) {
    senderZipCode = readlineSync.question(`First off, what is your zip code? `);

    senderState = readlineSync.question(`What state do you live in? (You can just enter the two letter abbreviation.) `)

    senderCity = readlineSync.question(`Awesome. What city do you live in? `);

    senderStreet = readlineSync.question(`${senderCity} is pretty cool! What is the first line of your street address? (Ex. 123 Main St.) `);

    senderAddressLine2 = readlineSync.question(`If you have an apartment number, or any other instructions you might give in an additional address line on a letter, please put it here. If this line doesn't apply to you, enter "skip". `);

    if (senderAddressLine2.toLowerCase() === 'skip') {
      senderAddressLine2 = '';
    }

    let addressVerification = readlineSync.question(`Nice work! Just to be sure, I have your address as ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}. Is that correct? `);

    if (addressVerification.toLowerCase() === 'no') {
      console.log(`Oh no! Let's try it again.`)
      addressConfirm = false;
    } else if (addressVerification.toLowerCase() === 'yes') {
      addressConfirm = true;
    } else {
      let invalidAddressConfirmationResponse = readlineSync.question(`Hmm. I didn't catch that. Try answering with "yes" or "no". Is your address ${senderStreet} ${senderCity} ${senderState} ${senderZipCode}? `);
      if (invalidAddressConfirmationResponse.toLowerCase() === 'no') {
        addressConfirm = false;
      } else if (invalidAddressConfirmationResponse.toLowerCase() === 'yes') {
        addressConfirm = true;
      }
    }
  }
  console.log(`Nice! Ok, now let's get to the good part.`);
  return senderStreet, senderAddressLine2, senderCity, senderState, senderZipCode;
}
