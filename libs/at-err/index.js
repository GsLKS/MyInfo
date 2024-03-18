/*
@ MyInfo:AT-ERR - Built in Original 'Anti-Error 0.0.2'
@ Otimized and native version for 'MyInfo'
*/

// at-err 0.2 (Released in the v1.1.0)

let sE = false;

function use(value) {
  sE = value;
  if (sE) {
    process.on('uncaughtException', function (err) {
      // console.error('...', err.message);
      console.log("\x1b[3m[Broken Alert]: Your 'MyInfo' binaries it's broken, try to fix using the 'mifix' command.\x1b[0m")
      return;
    });
  }
}

// if false => console.log('[MyInfo:AT-ERR] is not enabled');

module.exports = {
  use
  stoppedLog: 'Error Detected',
};