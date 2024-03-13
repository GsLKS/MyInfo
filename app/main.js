#!/usr/bin/env node

const https = require('https');
const dns = require('dns');
const os = require('os');
const fs = require('fs');
const path = require('path');
// const network = require('network'); (Deprecated)
require("../libs/at-err").use(true);
// let errTest = g;

/* mi */
// const srcPath = path.join(__dirname, '..', 'src', 'app.json');
let mi = require("../src/app.json");
/*
let mi;

try {
  mi = require("../src/app.json");
} catch (error) {
  mi = '(Error)';
}

return mi;
*/
/* mi:end */

console.log('MyInfo is working...');


function getIPAddress() {
    const options = {
        hostname: 'ie.cubie.com.br',
        path: '/partners-api/aethera-myinfo',
        headers: {
            'User-Agent': 'MyInfo/1.0.1'
        }
    };

    return new Promise((resolve, reject) => {
        https.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData.ip || '(Unable to get)');
                } catch (error) {
                    resolve('(Unable to parse)');
                }
            });
        }).on('error', (err) => {
            resolve('(Unable to get)');
        });
    });
}


function resolveAndMeasureTime(server, domain) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        dns.resolve(domain, (err, addresses) => {
            if (err) {
                resolve('(Unable to get)');
            } else {
                const endTime = Date.now();
                const responseTime = endTime - startTime;
                resolve(responseTime);
            }
        });
    });
}

function getDiskUsage() {/*
    return new Promise((resolve, reject) => {
   let t=0;const e=fs.readdirSync("/");e.forEach(e=>{const o=path.join("/",e),s=fs.statSync(o);t+=s.isDirectory()?getFolderSize(o):s.size});return t;
   if (!t) return '(Unable to get)';
    });
    if (error) return '(Unable to get)';*/
    return "(Unable to get)";
}



function getMemoryUsage() {
    try {
    return new Promise((resolve, reject) => {
        const totalMemoryMB = os.totalmem() / (1024 * 1024);
        const freeMemoryMB = os.freemem() / (1024 * 1024);
        const usedMemoryMB = totalMemoryMB - freeMemoryMB;
        resolve({
            total: totalMemoryMB.toFixed(2),
            free: freeMemoryMB.toFixed(2),
            used: usedMemoryMB.toFixed(2)
        });
    });
    } catch (error) {
        return '(Unable to get)';
    }
}


function getCPUUsage() {
    return new Promise((resolve, reject) => {
        
        const load = os.loadavg()[0];
        let cu = Math.round(load * 100) / 100;
        resolve(cu.toFixed(1));
    });
}

async function main() {
    try {
        const ipAddress = await getIPAddress();
        const dnsResponseTimeCF = await resolveAndMeasureTime('1.1.1.1', 'github.com');
        const dnsResponseTimeGoogle = await resolveAndMeasureTime('8.8.8.8', 'github.com');
        const diskUsage = await getDiskUsage();
        const memoryUsage = await getMemoryUsage();
        const cpuUsage = await getCPUUsage();
        const timestamp = new Date().toISOString();

        console.log(`
MyInfo Version: ${mi.version || '(Failed to fetch)'}

Hostname: ${os.hostname()}
OS: ${os.type()}
Platform: ${os.platform()}
Kernel: ${os.release()}
CPU Arch: ${os.arch()}
IP: ${ipAddress}
DNS Response Time (Cloudflare): ${dnsResponseTimeCF}ms
DNS Response Time (Google): ${dnsResponseTimeGoogle}ms
Ram Usage: ${memoryUsage.used}MB/${memoryUsage.total}MB
CPU Usage: ${cpuUsage}%
NodeJS Version: ${process.version}
Timestamp: ${timestamp}
`); /*
Disk Usage: ${diskUsage}MB
Disk Free: ${memoryUsage.free}MB
Disk Total: ${memoryUsage.total}MB
*/
    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
