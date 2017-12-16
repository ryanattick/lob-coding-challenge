const readlineSync = require('readline-sync');

let senderNameConfirm;

module.exports = function() {
  senderName = readlineSync.question(`Hello! I'm here to help you write a letter to your legislator about an issue you care about. Let's get started. What is your first and last name? `);

  while (!senderNameConfirm) {
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

  console.log(`I got it! Great! Let's make some social change. First, I'll need to where the letter is coming from. While you're going through this section, think about how your address would look if you wrote it on a letter.`);
  return senderName;
}
