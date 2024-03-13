/**
 * Built on top of command version
 * Remaked as api
**/

const https = require('https');
const dns = require('dns');
const os = require('os');
const fs = require('fs');
const path = require('path');
// require("../libs/at-err").use(true);

async function getIPAddress() {
    return new Promise((resolve) => {
        https.get('https://ie.cubie.com.br/partners-api/aethera-myinfo', (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                const jsonData = JSON.parse(data);
                resolve(jsonData.ip || '(Unable to get)');
            });
        }).on('error', () => {
            resolve('(Unable to get)');
        });
    });
}

function resolveAndMeasureTime(server, domain) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        dns.resolve(domain, (err) => {
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

function getDiskUsage() {
    return "(Unable to get)";
}

function getMemoryUsage() {
    try {
        const totalMemoryMB = os.totalmem() / (1024 * 1024);
        const freeMemoryMB = os.freemem() / (1024 * 1024);
        const usedMemoryMB = totalMemoryMB - freeMemoryMB;
        return {
            total: totalMemoryMB.toFixed(2),
            free: freeMemoryMB.toFixed(2),
            used: usedMemoryMB.toFixed(2)
        };
    } catch (error) {
        return '(Unable to get)';
    }
}

function getCPUUsage() {
    try {
        const load = os.loadavg()[0];
        const cpuUsage = Math.round(load * 100) / 100;
        return cpuUsage.toFixed(1);
    } catch (error) {
        return '(Unable to get)';
    }
}

async function mi(options) {
    try {
        const ipAddress = await getIPAddress();
        const dnsResponseTimeCF = await resolveAndMeasureTime('1.1.1.1', 'github.com');
        const dnsResponseTimeGoogle = await resolveAndMeasureTime('8.8.8.8', 'github.com');
        const diskUsage = await getDiskUsage();
        const memoryUsage = getMemoryUsage();
        const cpuUsage = getCPUUsage();
        const timestamp = new Date().toISOString();

        if (options.output === "json") {
            return JSON.stringify({
                version: require("./app.json").version || '(Failed to fetch)',
                hostname: os.hostname(),
                os: os.type(),
                platform: os.platform(),
                kernel: os.release(),
                cpuArch: os.arch(),
                ip: ipAddress,
                dnsResponseTimeCF: dnsResponseTimeCF,
                dnsResponseTimeGoogle: dnsResponseTimeGoogle,
                ramUsage: {
                    used: memoryUsage.used,
                    total: memoryUsage.total
                },
                cpuUsage: cpuUsage,
                nodeJSVersion: process.version,
                timestamp: timestamp
            });
        } else if (options.output === "normal") {
            return `
MyInfo Version: ${require("./app.json").version || '(Failed to fetch)'}
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
`;
        } else {
            return "Invalid output";
        }
    } catch (error) {
        return 'Error: ' + error.message;
    }
}

module.exports = mi;
