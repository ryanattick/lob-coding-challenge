const readlineSync = require('readline-sync');

let validMessageText;

module.exports = function() {
  console.log(`Now that we know who we're writing to, let's get down what you want to say.`)

  messageText = readlineSync.question(`As long as your message is 500 characters or less, you can write about any issue you care about. Let's get to it! Please enter the text you would like to be contained in your letter now. `);

  while (!validMessageText) {
    if (messageText.length <= 500) {
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
}
