#!/usr/bin/env node
const { exec } = require('child_process');

console.log("Fixing 'MyInfo'...")
exec('npm uninstall -g myinfo', (error, stdout, stderr) => {
  if (error) {
    console.error(`[MyInfo]: MyInfo is not instaled.`);
    return;
  }

  console.log(`Starting to repair...`);

  exec('npm i -g myinfo', (errorInstall, stdoutInstall, stderrInstall) => {
    if (errorInstall) {
      console.error(`Unable to repair, try reinstalling 'MyInfo'.`);
      return;
    }

    console.log(`Successfully fixed.`);
  });
});