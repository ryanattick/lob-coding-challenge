const readlineSync = require('readline-sync');

let validOfficialToContact;

module.exports = function() {
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
  return officialTitle, officialTitleForResponse;
}
