// v1.0
//console.log(require("os").cpus())

// v1.0.1
/*
let os = require("os");
console.log(os.loadavg()[0]);
*/

// v1.1 (FAILED)
/*
const os = require('os');
console.log(os.loadavg()[0] /  * 100); 
*/

// v1.2 (USED)
const os = require("os");
let cu = Math.round(os.loadavg()[0] * 100) / 100;
console.log(cu.toFixed(1));


// v1.2.1 (MEH)
/*
const os = require("os");
console.log(os.loadavg()[0].toFixed(1));
*/
