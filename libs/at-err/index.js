/*
@ MyInfo:AT-ERR - Built in Original 'Anti-Error 0.0.2'
@ Otimized and native version for 'MyInfo'
*/
let sE = false;

function use(value) {
  sE = value;
  if (sE) {
    process.on('uncaughtException', function (err) {
      // console.error('...', err.message);
      console.log("[Broken Alert]: Your 'MyInfo' is broken, try to fix with the 'mifix' command.")
      return;
    });
  }
}

function log(message) {
  if (sE) {
    console.log(message);
  } else {
    // console.log('[MyInfo:AT-ERR] is not enabled');
  }
}

module.exports = {
  use,
  log,
  stoppedLog: 'An error was avoided',
};
