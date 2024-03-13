// const mi = require("myinfo");
const mi = require("../src");

async function MyInfoJson() {
  try {
    const Mi = await mi({ output: "json" });
    // do somenthing
    // example
    console.log(JSON.parse(Mi));
    // example: console.log(JSON.parse(Mi).ip); 
    // shows ip
  } catch (error) {
    return;
  }
}

async function MyInfoNormal() {
    // normal output
  try {
    const Mi = await mi({ output: "normal" });
    return await Mi;
  } catch (error) {
    return;
  }
}

MyInfoJson()