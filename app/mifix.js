#!/usr/bin/env node
const { exec } = require('child_process');

console.log("\x1b[33mMifix is starting...\x1b[0m")
exec('npm uninstall -g myinfo', (error, stdout, stderr) => {
  if (error) {
    console.error(`\x1b[31m[MyInfo]: Unable to fix, Check that the tool has been installed correctly.\x1b[0m`);
    return;
  }

  console.log(`\x1b[33mStarting to repair 'MyInfo' binaries...\x1b[0m`);
  console.log(`\x1b[33m[!] Don't close this window, this may corrupt the tool.\x1b[0m`)

  exec('npm i -g myinfo', (errorInstall, stdoutInstall, stderrInstall) => {
    if (errorInstall) {
      console.error(`\x1b[31mUnable to fix correctly, try to reinstall 'MyInfo'.\x1b[0m`);
      return;
    }

    console.log(`\x1b[32mMyInfo was successfully fixed, test the the new fixed version.\x1b[0m`);
  });
});