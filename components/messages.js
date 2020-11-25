const moment = require('moment');

function messageFormatter(username, text) {
  return {
    username,
    text,
    time: moment().format(`DD-MM-yyyy(h:mm a)`)
  };
}

module.exports = messageFormatter;
