const {LOB_API_KEY} = require('../API.config');
const Lob = require('lob')(LOB_API_KEY);

module.exports = function() {
  Lob.letters.create({
    description: 'Demo Letter',
    to: {
      name: electedOfficial.name,
      address_line1: electedOfficial.address[0].line1,
      address_line2: electedOfficial.address[0].line2,
      address_city: electedOfficial.address[0].city,
      address_state: electedOfficial.address[0].state,
      address_zip: electedOfficial.address[0].zip,
      address_country: 'US',
    },
    from: {
      name: senderName,
      address_line1: senderStreet,
      address_line2: senderAddressLine2,
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
    console.log(`You're all done! Thank you for using your voice to work towards change in our society! Please consider sending more letters to your representatives! If you'd like to see a copy of the letter you just sent, please copy and paste this url into your browser: ${res.url} Keep up the good work!`);
  });
}
